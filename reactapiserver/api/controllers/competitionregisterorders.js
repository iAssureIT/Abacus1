const mongoose	= require("mongoose");

const CompetitionOrderMaster = require('../models/competitionregisterorders');
const MyExamMaster              = require('../models/myexammasters');

exports.fetch_mycompetitionorder = (req,res,next)=>{
  console.log('studentId ',req.params.studentId);
    var sId = req.params.studentId;
    CompetitionOrderMaster.find({studentId:sId,status:"paid"})
            .select("transactionId competitionOriginalFees paymentDate competitionId")
		        .exec()
            .then(competitionorder =>{
              console.log('competitionorder ',competitionorder);
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
    console.log('studentId n compId in get ',sId,compId);
    CompetitionOrderMaster.findOne({studentId:sId,competitionId:compId,status:"UnPaid"})
            
            .exec()
            .then(competitionorder =>{
              console.log('competitionorder in get',competitionorder);
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
            console.log('competitionorderreceipt ',competitionorderreceipt);
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

  console.log("req.params in response---status->",status);
  console.log("req.params in response--transid-->",transid);
  console.log("req.params in response--billNumbers-->",billNumbers);
  console.log("req.params in response---compId->",compId);
  console.log("req.params in response---sId->",sId);

  CompetitionOrderMaster.findOne({competitionId: compId,studentId:sId})
                          .exec()
                          .then(competitionRegisterOrderData=>{
                            if(competitionRegisterOrderData){
                              console.log("competitionRegisterOrderData----->",competitionRegisterOrderData._id);
                              console.log("req.params in if response---status->",status);
                              console.log("req.params in if response--transid-->",transid);
                              console.log("req.params in if response--billNumbers-->",billNumbers);
                              console.log("req.params in if response---compId->",compId);
                              console.log("req.params in if response---sId->",sId);
                              competitionRegisterOrderData.updateOne(
                                                                      {_id  :   competitionRegisterOrderData._id},
                                                                      {$set : {
                                                                            "status"    : status,
                                                                            "transactionId" : parseInt(transid),
                                                                            "billnumbers"   : parseInt(billNumbers),
                                                                            "paymentDate"   : new Date(),
                                                                            "paymentMode"   : "Online",
                                                                          }
                                                                      }                               
                                                                    )
                                                          .exec()
                                                          .then(data=>{
                                                        console.log("data competitionRegisterOrderData----->",competitionRegisterOrderData._id);

                                                            console.log("data----->",data);
                                                            if(data.nModified == 1){
                                                              res.status(200).json({message:"Success"})
                                                            }else{
                                                              res.status(200).json({message:"Failed"})
                                                            }
                                                          }
                                                            )
                                                          .catch()

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
  console.log('studentId ',req.params.studentId);
    var sId = req.params.studentId;
    CompetitionOrderMaster.find({studentId:sId,status:"paid"})
            .select("competitionId")
		        .exec()
            .then(competitionorder =>{
              console.log('competitionorder ',competitionorder);
              res.status(200).json(competitionorder);
              // if(competitionorder){
              //   var competitionorderList = [];
              //   competitionorder.map((co)=>{
              //     console.log('competitionId ',co.competitionId);
              //     MyExamMaster.findOne({competitionId:co.competitionId,StudentId:req.params.studentID})
              //               .select("examStatus")
              //               .exec()
              //               .then(examData=>{
              //                 if(examData){
              //                   console.log('got exam');
              //                   competitionorderList.push({
              //                     competitionorder      : co._id,
              //                     studentPaymentStatus  : "Paid",
              //                     examDataStatus        : examData.examStatus,
              //                     examId                : examData._id,
              //                   });
              //                 }else{
              //                   console.log(' exam not found');
              //                   competitionorderList.push({
              //                     competitionorder      : co._id,
              //                     studentPaymentStatus  : "Paid",
              //                     examDataStatus        : "",
              //                     examId                : "",
              //                   });
              //                 }
              //               })
              //               .catch(err =>{
              //                 console.log(err);
              //                 res.status(500).json({
              //                   error: err
              //                   });
              //               });
              //   });
              //   console.log('competitionorderList ',competitionorderList);
              //   if(competitionorder.length == competitionorderList.length){
              //     res.status(200).json(competitionorderList);
              //   }
              // }else{
              //   res.status(200).json({
              //     studentPaymentStatus  : "unPaid",
              //     examDataStatus        : "",
              //     examId                : "",
              //   })
              // }
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
}

