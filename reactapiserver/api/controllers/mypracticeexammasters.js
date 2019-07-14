const mongoose	= require("mongoose");

const MyPracticeExamMaster = require('../models/mypracticeexammasters');

exports.fetch_practice_student = (req,res,next)=>{
    var studentId = req.params.studentId;
    MyPracticeExamMaster.find({StudentId:studentId,examStatus:"Completed"})
            .sort( { createdAt:-1} )
            .select("examName date category totalQuestion attemptedQues correctAnswer wrongAnswer originalTime totalScore examTime")
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

exports.fetch_incomplete_student = (req,res,next)=>{
  var studentId = req.params.studentId;
  MyPracticeExamMaster.find({StudentId:studentId,examStatus:"InCompleted"})
          .sort( { createdAt:-1} )
          .select("examName date category totalQuestion attemptedQues correctAnswer wrongAnswer originalTime totalScore examTime")
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

exports.fetch_exampaper_student = (req,res,next)=>{
  var studentId     = req.params.studentId;
  var examPaperId   = req.params.examPaperId;
  MyPracticeExamMaster.find({StudentId:studentId,examPaperId:examPaperId})
                      .select("examStatus")
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

exports.fetch_practice_exam_student = (req,res,next)=>{
  var studentId                   = req.params.studentId;
  var practiceExamId   = req.params.practiceExamId;
  MyPracticeExamMaster.findOne({_id:practiceExamId,StudentId:studentId})
                      .select("examTime totalQuestion answerArray totalMarks examTime examName lastVisitedQuestion lastVisitedQAnswer examStatus")
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

exports.fetch_practice = (req,res,next)=>{
  var practiceExamId   = req.params.practiceExamId;
  MyPracticeExamMaster.findOne({_id:practiceExamId})
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

exports.update_exam_ans = (req,res,next)=>{
  MyPracticeExamMaster.updateOne(
                          {"_id":req.body.examId},
                          {
                            $set:{
                              ['answerArray.'+req.body.index+'.attempted']    : "Yes",
                              ['answerArray.'+req.body.index+'.studentAnswer']: req.body.studAnswer,
                              ['answerArray.'+req.body.index+'.answer']       : req.body.answer,
                              'examTime'                                      : req.body.examTime,
                              'lastVisitedQuestion'                           : parseInt(req.body.index),
                              'lastVisitedQAnswer'                            : req.body.studAnswer,
                            }
                          })
                      .exec()
                      .then(d => {
                        if(d.nModified == 1){
                          res.status(200).json("Updated successfully");                                                
                        }else{
                          res.status(404).json("Update failed");                        
                        }
                      })
                      .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                          error: err
                        });
                      });
}

exports.ExamMarksUpdate = (req,res,next) =>{
  console.log('my exam result')
  MyPracticeExamMaster.aggregate([
                              // {$match : {"_id":req.params.examId}},
                              {$group : 
                                        {
                                          _id : "$answerArray.attempted"
                                        }
                              },
                        ])
                      .exec()
                      .then(data=>{
                        res.status(200).json(data);
                      })
                      .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
}

exports.updateQuestionPaperMasterAccordingtoPackages = (req,res,next) =>{
  
}