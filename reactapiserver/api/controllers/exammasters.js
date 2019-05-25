const mongoose	= require("mongoose");

const ExamMaster = require('../models/exammasters');

exports.fetch_all = (req,res,next)=>{
    ExamMaster.find({competitionView:"Show"})
            .sort( { competitionName:1,competitionView:1 } )
            .select("competitionName competitionView")
		    .exec()
            .then(instructions =>{
            //   console.log('packages ',packages);
              res.status(200).json(instructions);
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
}
exports.fetch_examstatus = (req, res,next)=>{
  console.log('comp Id ',req.params.competitionId);
  ExamMaster.findOne({_id:req.params.competitionId})
            .select("result")
            .exec()
            .then(examstatus=>{
              console.log('examstatus ',examstatus);
              res.status(200).json(examstatus);
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
}

