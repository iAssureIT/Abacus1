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

exports.fetch_mycompetitionorderreceipt = (req,res,next)=>{
  var sId = req.params.studentId;
  var compId = req.params.competitionId;
  CompetitionOrderMaster.findOne({competitionId:compId , studentId:sId,status:"paid"})
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

exports.fetch_mycompetitionorder_examStatus = (req,res,next)=>{
  console.log('studentId ',req.params.studentId);
    var sId = req.params.studentId;
    CompetitionOrderMaster.find({studentId:sId,status:"paid"})
            .select("competitionId")
		        .exec()
            .then(competitionorder =>{
              if(competitionorder){
                var competitionorderList = [];
                competitionorder.map((co)=>{
                  MyExamMaster.findOne({competitionId:co.competitionId,StudentId:req.params.studentID})
                            .select("examStatus")
                            .exec()
                            .then(examData=>{
                              if(examData){
                                competitionorderList.push({
                                  competitionorder      : competitionorder._id,
                                  studentPaymentStatus  : "Paid",
                                  examDataStatus        : examData.examStatus,
                                  examId                : examData._id,
                                });
                              }else{
                                competitionorderList.push({
                                  competitionorder      : competitionorder._id,
                                  studentPaymentStatus  : "Paid",
                                  examDataStatus        : "",
                                  examId                : "",
                                });
                              }
                            })
                            .catch(err =>{
                              console.log(err);
                              res.status(500).json({
                                error: err
                                });
                            });
                });
                if(competitionorder.length == competitionorderList.length){
                  res.status(200).json(competitionorderList);
                }
              }else{
                res.status(200).json({
                  studentPaymentStatus  : "unPaid",
                  examDataStatus        : "",
                  examId                : "",
                })
              }
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
}

