const mongoose	= require("mongoose");
const ExamMaster = require('../models/exammasters');

exports.fetch_all = (req,res,next)=>{
    ExamMaster.find({competitionView:"Show"})
            .sort( { competitionName:1,competitionView:1 } )
            .select("competitionName competitionView")
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

exports.fetch_statu_exam = (req,res,next)=>{
  var competitionId = req.params.competitionId;
  console.log('competitionId ',competitionId);
  ExamMaster.find({_id:competitionId})
          .select("result")
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


