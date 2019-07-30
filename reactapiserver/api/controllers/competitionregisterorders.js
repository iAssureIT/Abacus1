const mongoose	= require("mongoose");

const CompetitionOrderMaster = require('../models/competitionregisterorders');
const MyExamMaster              = require('../models/myexammasters');

exports.fetch_mycompetitionorder = (req,res,next)=>{
    var sId = req.params.studentId;
    CompetitionOrderMaster.find({studentId:sId,status:"paid"})
            .select("transactionId competitionOriginalFees paymentDate competitionId")
		        .exec()
            .then(competitionorder =>{
              res.status(200).json(competitionorder);
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
}

exports.fetch_unpaid_mycompetitionorder = (req,res,next)=>{  
    var sId = req.params.studentId;
    var compId = req.params.competitionId;
    CompetitionOrderMaster.findOne({studentId:sId,competitionId:compId,status:"UnPaid"})            
            .exec()
            .then(competitionorder =>{
              res.status(200).json(competitionorder);
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
}

exports.fetch_mycompetitionorderreceipt = (req,res,next)=>{
  var sId = req.params.studentId;
  var compId = req.params.competitionId;
  CompetitionOrderMaster.findOne({competitionId:compId,studentId:sId,status:"paid"})
          .select("receiptType status competitionId competitionFees transactionId billnumbers paymentDate")
          .exec()
          .then(competitionorderreceipt =>{
            res.status(200).json(competitionorderreceipt);
          })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
              error: err
              });
          });
}

exports.update_mycompetitionorderreceipt = (req,res,next)=>{
  var sId = req.params.studentId;
  var compId = req.params.competitionId;
  var status = req.params.status;
  var transid = req.params.id;
  var billNumbers = req.params.billNumbers;
  CompetitionOrderMaster.findOne({competitionId: compId,studentId:sId})
                          .exec()
                          .then(competitionRegisterOrderData=>{
                            if(competitionRegisterOrderData){
                              const selector = {"_id"  : competitionRegisterOrderData._id};
                                    CompetitionOrderMaster.updateOne(
                                                                      selector,
                                                                      {$set : {
                                                                            "status"        : status,
                                                                            "transactionId" : parseInt(transid),
                                                                            "billnumbers"   : parseInt(billNumbers),
                                                                            "paymentMode"   : "Online",
                                                                            "paymentDate"   : new Date(),
                                                                          }
                                                                      }                               
                                                                    )
                                                          .exec()
                                                          .then(data=>{                                                           
                                                            if(data.nModified == 1){
                                                              res.status(200).json({message:"Success"})
                                                            }else{
                                                              res.status(200).json({message:"Failed"})
                                                            }
                                                          }
                                                            )
                                                          .catch(err=>{
                                                            console.log("error---->",err);
                                                          })

                            }
                          })
                          .catch(err =>{
                              console.log(err);
                              res.status(500).json({
                                error: err
                                });
                            })
  

}

exports.fetch_mycompetitionorder_examStatus = (req,res,next)=>{
    var sId = req.params.studentId;
    CompetitionOrderMaster.find({studentId:sId,status:"paid"})
            .select("competitionId")
		        .exec()
            .then(competitionorder =>{
              res.status(200).json(competitionorder);           
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
}

