const mongoose	= require("mongoose");

const QuickWalletMasters        = require('../models/quickwalletmasters');
const StudentMaster             = require('../models/studentmasters');

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
    StudentMaster
}