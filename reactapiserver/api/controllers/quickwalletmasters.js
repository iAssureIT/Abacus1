const mongoose	= require("mongoose");

const QuickWalletMasters        = require('../models/quickwalletmasters');
const StudentMaster             = require('../models/studentmasters');
const ExamMaster                = require('../models/exammasters');
const CompetitionRegisterOrder  = require('../models/competitionregisterorders');

exports.fetch_details = (req,res,next)=>{
    QuickWalletMasters.find()
    		        .exec()
                    .then(data =>{
                        //   console.log('data ',data);
                        res.status(200).json(data);
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
    
}

exports.makepayment = (req,res,next) =>{
    var mobileNumber    = req.body.mobileNumber;
    var packageTotal    = req.body.packageTotal;
    QuickWalletMasters  .find()
                        .exec()
                        .then(QWCredential =>{
                            if(QWCredential.environment=="production"){
                                var API         = QWCredential.prodAPI;
                                var partnerid   = QWCredential.prodKey;
                                var secret      = QWCredential.prodSecret;
                                }else{
                                    var API       = QWCredential.sandboxAPI;
                                    var partnerid = QWCredential.sandboxKey;
                                    var secret    = QWCredential.sandboxSecret;
                                }
                                var quickWalletInput = {
                                           "partnerid"      : partnerid,
                                           "mobile"         : mobileNumber,
                                           "secret"         : secret,
                                           "amount"         : packageTotal,
                                           "redirecturl"    : Meteor.absoluteUrl()+'packagePayment-response/'+pOrderId,          
                                };
                                if(quickWalletInput){
                                    var result = HTTP.call("POST", API+"/api/partner/"+quickWalletInput.partnerid+"/requestpayment",
				                               {params: quickWalletInput});
                                    // console.log('result:',result);
                                    if(result.data.status == 'success'){
                                        var paymentUrl = result.data.data.url;
                                        // console.log('paymentUrl:',paymentUrl);
                                        return paymentUrl;
                                        res.status(200).json({message : "Payment successfully",paymentUrl : paymentUrl});
                                    }else{
                                        res.status(200).json({message : "Payment failed",paymentUrl : null});
                                    }
                                }
                                
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });

}

exports.paymentGatewayforCompetition = (req,res,next) => {
    StudentMaster   .findOne({studentId:req.params.studentId})
                    .exec()
                    .then(studentMasterData=>{
                        if(studentMasterData){
                            ExamMaster.findOne({_id:req.params.competitionId})
                                        .exec()
                                        .then(ExamMasterData=>{
                                            if(ExamMasterData){
                                                const competitionRegisterOrder = new CompetitionRegisterOrder({
                                                    '_id'                       : new mongoose.Types.ObjectId(),
                                                    'competitionId'	            : req.params.competitionId,
                                                    'competitionName'           : ExamMasterData.competitionName,
                                                    'studentFullName'           : studentMasterData.studentFullName,
                                                    'studentId' 	            : req.params.studentId,
                                                    'category'                  : studentMasterData.category,
                                                    'subCategory'               : studentMasterData.subCategory,
                                                    'franchiseId'               : studentMasterData.franchiseId,
                                                    'franchiseName'             : studentMasterData.franchiseName,
                                                    "competitionFees"           : req.params.compfees,
                                                    "competitionOriginalFees"   : req.params.compfees,
                                                    "franchiseShare"            : ExamMasterData.franchiseShare,
                                                    "maatsShare"                : ExamMasterData.maatsShare,
                                                    'status'    	            : 'UnPaid',
                                                });
                                                competitionRegisterOrder.save()
                                                                        .then(data=>{
                                                                            QuickWalletMasters.findOne({})
                                                                                             .exe()
                                                                                             .then(QWCredential=>{
                                                                                                 if(QWCredential){
                                                                                                    if(QWCredential.environment=="production"){
                                                                                                        var API = QWCredential.prodAPI;
                                                                                                        var partnerid = QWCredential.prodKey;
                                                                                                        var secret    = QWCredential.prodSecret;
                                                                                                    }else{
                                                                                                        var API       = QWCredential.sandboxAPI;
                                                                                                        var partnerid = QWCredential.sandboxKey;
                                                                                                        var secret    = QWCredential.sandboxSecret;
                                                                                                    }
                                                                                                    var quickWalletInput = {
                                                                                                               "partnerid" : partnerid,
                                                                                                               "mobile"   :   mobileNumber,
                                                                                                               "secret"   :   secret,
                                                                                                               "amount"   :    competitionFees,
                                                                                                               "redirecturl" : Meteor.absoluteUrl()+'payment-response/'+userId+'/'+comp_id,             
                                                                                                    };
                                                                                                    if(quickWalletInput){
                                                                                                        var result = HTTP.call("POST", API+"/api/partner/"+quickWalletInput.partnerid+"/requestpayment",
                                                                                                                            {params: quickWalletInput});
                                                                                                        if(result.data.status == 'success'){
                                                                                                            var paymentUrl = result.data.data.url;
                                                                                                            res.status(200).json(paymentUrl);
                                                                                                        }else{
                                                                                                            res.status(200).json(false);
                                                                                                        }
                                                                                                    }
                                                                                                 }else{
                                                                                                     res.status(409).json({message:"Quick wallet details not found."})
                                                                                                 }
                                                                                             })
                                                                                             .catch(err =>{
                                                                                                console.log(err);
                                                                                                res.status(500).json({
                                                                                                    error: err
                                                                                                });
                                                                                            });                      
                                                                        })
                                                                        .catch(err =>{
                                                                            console.log(err);
                                                                            res.status(500).json({
                                                                                error: err
                                                                            });
                                                                        });
                                            }else{
                                                res.status(409).json({message:"Exam not found"});
                                            }
                                        })
                                        .catch(err =>{
                                            console.log(err);
                                            res.status(500).json({
                                                error: err
                                            });
                                        });
                        }else{
                            res.status(409).json({message:"Student Not found"})
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
}