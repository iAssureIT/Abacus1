const mongoose	= require("mongoose");
var ObjectID = require("mongodb").ObjectID;

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
  MyPracticeExamMaster.findOne({"_id":req.params.examId})
              .exec()
              .then(practiceExamData=>{
                  if(practiceExamData){
                      var marksPerQues = practiceExamData.marksPerQues;
                      var correctAnswer = practiceExamData.answerArray.filter(function(mapData){
                                      return mapData.answer === "Correct";
                                  }).length;
                      var wrongAnswer  = practiceExamData.answerArray.filter(function(mapData){
                                          return mapData.answer === "Wrong";
                                      }).length;
                      var attepmted  = practiceExamData.answerArray.filter(function(mapData){
                                          return mapData.attempted === "Yes";
                                      }).length;
                      var totalScore  = correctAnswer * marksPerQues;
                      var totalQue  = practiceExamData.totalQuestion;
                      var examType = practiceExamData.examType;
                      var totalMarks = practiceExamData.totalMarks;
                      if(examType ){
                        MyPracticeExamMaster.updateOne(
                                                    {"_id":req.params.examId},
                                                    {
                                                      $set:{
                                                        "attemptedQues":attepmted,
                                                        "correctAnswer":correctAnswer,
                                                        "wrongAnswer"  :wrongAnswer,
                                                        "totalScore"   :totalScore,
                                                        "examStatus"   :"Completed",
                                                      }
                                                    }
                                            )
                                            .exec()
                                            .then(result=>{
                                              var sendRes = {
                                                examType      : examType,
                                                totalQuestion : totalQue,
                                                totalMarks    : totalMarks,
                                                percentage    : (parseInt(totalScore)/parseInt(totalMarks))*100,
                                                attemptedQues : attepmted,
                                                correctAnswer : correctAnswer,
                                                wrongAnswer   : wrongAnswer,
                                                totalScore    : totalScore,
                                              };
                                              if(sendRes){
                                                res.status(200).json(sendRes);
                                              }
                                            })
                                            .catch(err =>{
                                              console.log(err);
                                              res.status(500).json({
                                                  error: err
                                              });
                                          });                              
                      }
                      
                  }else{
                      res.status(409).json({message:"Exam Not Found"});
                  }
              })
              .catch(err =>{
                  console.log(err);
                  res.status(500).json({
                      error: err
                  });
              });
  
}

exports.completeExam = (req,res,next) =>{
  console.log('completeexam');
  MyPracticeExamMaster.updateOne(
                              {"_id":req.params.examId},
                              {
                                $set:{
                                  'examStatus'  : "Completed",
                                }
                              })
                          .exec()
                          .then(d => {
                            console.log('d ',d);
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
