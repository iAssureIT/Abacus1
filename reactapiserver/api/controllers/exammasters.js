const mongoose	    = require("mongoose");
var moment          = require('moment');
const ExamMaster    = require('../models/exammasters');
const StudentMaster = require('../models/studentmasters');

exports.fetch_exam_details = (req,res,next)=>{
  ExamMaster.find({competitionView:"Show"})
          .sort( { competitionDate:-1} )
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
          .select("result ")
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

exports.competitionDetails = (req,res,next)=>{
  StudentMaster .findOne({_id:req.params.studentId})
                .exec()
                .then(studentMasterData=>{
                  if(studentMasterData){
                    ExamMaster.find({_id:req.params.competitionId})
                              .select("result ")
                              .exec()
                              .then(competitionData =>{
                                  if(competitionData){
                                    var dateformat = moment(competitionData.competitionDate).format('MMM Do YYYY');
                                    var CompetitionExamData = competitionData.competitionExams;
                                    if(CompetitionExamData){
                                      var arrIndex = CompetitionExamData.findIndex(function(object,index){ return object.category == studentMasterData.category && object.subCategory == studentMasterData.subCategory});
                                      if(arrIndex){
                                        res.status(200).json({
                                                                competitionData     : competitionData,
                                                                CompetitionExamData : competitionData.competitionExams[arrIndex],
                                                                dateformat          : dateformat,
                                                                studentMasterData   : studentMasterData,
                                                              });
                                      }else{
                                        res.status(409).json({message:"competition Exam does not exist"})  
                                      }
                                    }else{
                                      res.status(409).json({message:"competition Exam does not exist"})
                                    }
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
                    res.status(409).json({message:"Student Not found"});
                  }
                })
                .catch(err =>{
                  console.log(err);
                  res.status(500).json({
                    error: err
                    });
                });      
}



