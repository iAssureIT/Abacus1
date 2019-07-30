const mongoose	= require("mongoose");
var request = require('request-promise');
const QuickWalletMasters        = require('../models/quickwalletmasters');
const StudentMaster             = require('../models/studentmasters');
const ExamMaster                = require('../models/exammasters');
const CompetitionRegisterOrder  = require('../models/competitionregisterorders');
var http = require("http");
var request = require('request-promise');

exports.fetch_details = (req,res,next)=>{
    QuickWalletMasters.find()
    		        .exec()
                    .then(data =>{
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
    var orderId         = req.body.orderId;
    var baseUrl         = req.body.baseUrl
    
    QuickWalletMasters  .findOne({})
                        .exec()
                        .then(QWCredential =>{
                            if(QWCredential){
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
                                    "redirecturl"    : baseUrl+'/packagePayment-response/'+req.body.OrderId ,
                                    // "redirecturl"    : 'http://localhost:3000/packagePayment-response/'+req.body.OrderId ,
                                };
                                var url = API+"/api/partner/"+quickWalletInput.partnerid+"/requestpayment";
                                
                                request({
                                    "method"    :"POST", 
                                    "url"       : url,
                                    "body"    : quickWalletInput,
                                    "json"      : true,
                                    "headers"   : {
                                                        "User-Agent": "Integration Test",
                                                        "Authorization": "Bearer " + "secret",
                                                    }
                                })
                                .then(payresponse=>{
                                   
                                    if(payresponse.status == 'success'){
                                        var paymentUrl = payresponse.data.url;
                                        // res.header("Access-Control-Allow-Origin","*");
                                        res.status(200).json(paymentUrl);
                                    }else{
                                        res.status(200).json(false);
                                    }
                                })
                                .catch(err =>{
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    });
                                });
                                // res.status(200).json({quickWalletInput});
                            }else{
                                res.status(200).json({message:"Qucikwalletmaster data not found"});
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
                           
                            var mobileNum = studentMasterData.mobileNumber;
                            var number = mobileNum.split('-');
                            var concatNum = number[0]+number[1]+number[2];
                            var mobNumber = String(concatNum);
                           
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
                                                                                             .exec()
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
                                                                                                               "partnerid"  : partnerid,
                                                                                                               "mobile"     : mobNumber,
                                                                                                               "secret"     : secret,
                                                                                                               "amount"     : req.params.compfees,
                                                                                                               // "redirecturl" : 'http://localhost:3000/payment-response/'+req.params.competitionId,             
                                                                                                               "redirecturl" : req.body.url+'/payment-response/'+req.params.competitionId,             
                                                                                                    };
                                                                                                    if(quickWalletInput){
                                                                                                       

                                                                                                        // var result = HTTP.call("POST", API+"/api/partner/"+quickWalletInput.partnerid+"/requestpayment",
                                                                                                                            // {params: quickWalletInput});
                                                                                                        var result = request({
                                                                                                                            "method":"POST", 
                                                                                                                            // "url": "https://uat.quikwallet.com/api/partner/366/requestpayment",
                                                                                                                            "url": API+"/api/partner/"+quickWalletInput.partnerid+"/requestpayment",
                                                                                                                            "body" : quickWalletInput,
                                                                                                                            "json": true,
                                                                                                                            "headers": {
                                                                                                                            "User-Agent": "My little demo app",
                                                                                                                            "Authorization": "Bearer " + "secrect",
                                                                                                                            }
                                                                                                                        }).then(payresponse=>{
                                                                                                                           
                                                                                                                            if(payresponse.status == 'success'){
                                                                                                                                var paymentUrl = payresponse.data.url;

                                                                                                                                res.status(200).json(paymentUrl);
                                                                                                                            }else{
                                                                                                                                res.status(200).json(false);
                                                                                                                            }
                                                                                                                            res.status(200).json("Something went wrong");
                                                                                                                        });
                                                                                                       
                                                                                    
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