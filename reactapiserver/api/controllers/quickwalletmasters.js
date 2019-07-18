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
    QuickWalletMasters  .find()
                        .exec()
                        .then(QWCredential =>{
                            if(QWCredential){
                                console.log('QWCredential ',QWCredential);
                                // if(QWCredential.environment=="production"){
                                //     var API         = QWCredential.prodAPI;
                                //     var partnerid   = QWCredential.prodKey;
                                //     var secret      = QWCredential.prodSecret;
                                // }else{
                                //     var API       = QWCredential.sandboxAPI;
                                //     var partnerid = QWCredential.sandboxKey;
                                //     var secret    = QWCredential.sandboxSecret;
                                // }
                                // if(quickWalletInput && API && partnerid && secret){
                                    var quickWalletInput = {
                                               "partnerid"      : '366',
                                               "mobile"         : mobileNumber,
                                               "secret"         : 'wLunwmCYLTVqvpbcZEMvXNznpPYVTFMmp',
                                               "amount"         : packageTotal,
                                               "redirecturl"    : 'http://localhost:3042/'+'packagePayment-response/'+req.body.OrderId,          
                                    };
                                    // console.log('quickWalletInput ',quickWalletInput);
                                    // console.log('API ',API);
                                    // console.log('partnerid ',partnerid);
                                    // console.log('secret ',secret);
    
                                    request({
                                                "method":"POST", 
                                                "uri": "https://uat.quikwallet.com/api/partner/"+quickWalletInput.partnerid+"/requestpayment",
                                                "params" : quickWalletInput,
                                                "json": true,
                                                "headers": {
                                                    "User-Agent": "My little demo app",
                                                    "Authorization": "Bearer " + "secrect",
                                                }
                                            }).then(payresponse=>{
                                                console.log('payresponse ',payresponse);
                                                if(payresponse.status == 'success'){
                                                    var paymentUrl = payresponse.data.url;

                                                    res.status(200).json(paymentUrl);
                                                }else{
                                                    res.status(200).json(false);
                                                }
                                                res.status(200).json("Something went wrong");
                                            });
                                        // var result = HTTP.call("POST", API+"/api/partner/"+quickWalletInput.partnerid+"/requestpayment",
                                        //            {params: quickWalletInput});
                                        // if(result.data.status == 'success'){
                                        //     var paymentUrl = result.data.data.url;
                                        //     res.status(200).json({message : "Payment successfully",paymentUrl : paymentUrl});
                                        // }else{
                                        //     res.status(200).json({message : "Payment failed",paymentUrl : null});
                                        // }
                                    // }else{
                                    //     res.status(200).json('Failed')
                                    // }
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
    console.log('body ',req.body);
    // StudentMaster   .findOne({studentId:req.params.studentId})
    //                 .exec()
    //                 .then(studentMasterData=>{
    //                     if(studentMasterData){
    //                         ExamMaster.findOne({_id:req.params.competitionId})
    //                                     .exec()
    //                                     .then(ExamMasterData=>{
    //                                         if(ExamMasterData){
    //                                             const competitionRegisterOrder = new CompetitionRegisterOrder({
    //                                                 '_id'                       : new mongoose.Types.ObjectId(),
    //                                                 'competitionId'	            : req.params.competitionId,
    //                                                 'competitionName'           : ExamMasterData.competitionName,
    //                                                 'studentFullName'           : studentMasterData.studentFullName,
    //                                                 'studentId' 	            : req.params.studentId,
    //                                                 'category'                  : studentMasterData.category,
    //                                                 'subCategory'               : studentMasterData.subCategory,
    //                                                 'franchiseId'               : studentMasterData.franchiseId,
    //                                                 'franchiseName'             : studentMasterData.franchiseName,
    //                                                 "competitionFees"           : req.params.compfees,
    //                                                 "competitionOriginalFees"   : req.params.compfees,
    //                                                 "franchiseShare"            : ExamMasterData.franchiseShare,
    //                                                 "maatsShare"                : ExamMasterData.maatsShare,
    //                                                 'status'    	            : 'UnPaid',
    //                                             });
    //                                             competitionRegisterOrder.save()
    //                                                                     .then(data=>{
    //                                                                         QuickWalletMasters.findOne({})
    //                                                                                          .exec()
    //                                                                                          .then(QWCredential=>{
    //                                                                                              if(QWCredential){
    //                                                                                                 if(QWCredential.environment=="production"){
    //                                                                                                     var API = QWCredential.prodAPI;
    //                                                                                                     var partnerid = QWCredential.prodKey;
    //                                                                                                     var secret    = QWCredential.prodSecret;
    //                                                                                                 }else{
    //                                                                                                     var API       = QWCredential.sandboxAPI;
    //                                                                                                     var partnerid = QWCredential.sandboxKey;
    //                                                                                                     var secret    = QWCredential.sandboxSecret;
    //                                                                                                 }
    //                                                                                                 var quickWalletInput = {
    //                                                                                                            "partnerid"  : partnerid,
    //                                                                                                            "mobile"     : studentMasterData.mobileNumber,
    //                                                                                                            "secret"     : secret,
    //                                                                                                            "amount"     : req.params.compfees,
    //                                                                                                            "redirecturl" : req.body.url+'payment-response/'+req.params.studentId+'/'+req.params.competitionId,             
    //                                                                                                 };
    //                                                                                                 if(quickWalletInput){
    //                                                                                                     console.log('quickWalletInput ',quickWalletInput);

    //                                                                                                     // var result = HTTP.call("POST", API+"/api/partner/"+quickWalletInput.partnerid+"/requestpayment",
    //                                                                                                                         // {params: quickWalletInput});
    //                                                                                                     var result = request({
    //                                                                                                                         "method":"POST", 
    //                                                                                                                         "uri": API+"/api/partner/"+quickWalletInput.partnerid+"/requestpayment",
    //                                                                                                                         "params" : quickWalletInput,
    //                                                                                                                         "json": true,
    //                                                                                                                         "headers": {
    //                                                                                                                         "User-Agent": "My little demo app",
    //                                                                                                                         "Authorization": "Bearer " + "secrect",
    //                                                                                                                         }
    //                                                                                                                     }).then(payresponse=>{
    //                                                                                                                         console.log('payresponse ',payresponse);
    //                                                                                                                         if(payresponse.status == 'success'){
    //                                                                                                                             var paymentUrl = payresponse.data.url;

    //                                                                                                                             res.status(200).json(paymentUrl);
    //                                                                                                                         }else{
    //                                                                                                                             res.status(200).json(false);
    //                                                                                                                         }
    //                                                                                                                         res.status(200).json("Something went wrong");
    //                                                                                                                     });
    //                                                                                                     console.log('result ',result);
                                                                                    
    //                                                                                                 }
    //                                                                                              }else{
    //                                                                                                  res.status(409).json({message:"Quick wallet details not found."})
    //                                                                                              }
    //                                                                                          })
    //                                                                                          .catch(err =>{
    //                                                                                             console.log(err);
    //                                                                                             res.status(500).json({
    //                                                                                                 error: err
    //                                                                                             });
    //                                                                                         });                      
    //                                                                     })
    //                                                                     .catch(err =>{
    //                                                                         console.log(err);
    //                                                                         res.status(500).json({
    //                                                                             error: err
    //                                                                         });
    //                                                                     });
    //                                         }else{
    //                                             res.status(409).json({message:"Exam not found"});
    //                                         }
    //                                     })
    //                                     .catch(err =>{
    //                                         console.log(err);
    //                                         res.status(500).json({
    //                                             error: err
    //                                         });
    //                                     });
    //                     }else{
    //                         res.status(409).json({message:"Student Not found"})
    //                     }
    //                 })
    //                 .catch(err =>{
    //                     console.log(err);
    //                     res.status(500).json({
    //                         error: err
    //                     });
    //                 });
}