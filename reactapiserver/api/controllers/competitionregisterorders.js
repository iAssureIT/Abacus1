const mongoose	= require("mongoose");

const CompetitionOrderMaster = require('../models/competitionregisterorders');

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