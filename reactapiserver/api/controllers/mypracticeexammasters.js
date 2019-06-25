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
                      .select("examTime totalQuestion answerArray totalMarks examTime examName")
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
                      .select("lastVisitedQuestion lastVisitedQAnswer")
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
  var examId   = req.body.examId;
  MyPracticeExamMaster.updateOne(
                                  { _id : examId },
                                  {
                                    $set:{
                                      'examTime':examTime,
                                      'lastVisitedQuestion':parseInt(index),
                                      'lastVisitedQAnswer':studAnswer,
                                    }
                                  }
                                )
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