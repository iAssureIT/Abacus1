const mongoose	= require("mongoose");

const MyPracticeExamMaster = require('../models/mypracticeexammasters');

exports.fetch_mypracticeexamreport = (req,res,next)=>{
    var sId = req.body.studentId;
    MyPracticeExamMaster.find({StudentId:sId,examStatus:"Completed"})
            .sort( { createdAt:-1, examName:1,date:1,category:1,totalQuestion:1,attemptedQues:1,correctAnswer:1,wrongAnswer:1,originalTime:1,totalScore:1,examTime:1} )
            .select("examName date category totalQuestion attemptedQues correctAnswer wrongAnswer originalTime examTime totalScore")
		    .exec()
            .then(reports =>{
              console.log('reports ',reports.length);
              res.status(200).json(reports);
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
}

exports.getPracticeExamTimeData = (req,res,next) =>{
  var examId    = req.body.examId;
  var studentId = req.body.studentId;
  MyPracticeExamMaster.find({_id:examId,StudentId: studentId})
                      .select("examTime")
                      .exec()
                      .then(getPracticeExamTimeData => {
                        res.status(200).json(getPracticeExamTimeData);
                      })
                      .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                          error: err
                          });
                      });

}

exports.getLastVisitedQuestion = (req,res,next) =>{
  var examId    = req.body.examId;
  MyPracticeExamMaster.find({_id:examId})
                      .select("lastVisitedQuestion lastVisitedQAnswer")
                      .exec()
                      .then(getLastVisitedQuestion => {
                        res.status(200).json(getLastVisitedQuestion);
                      })
                      .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                          error: err
                          });
                      });

}

exports.getExamQuestions = (req,res,next) =>{
  var examId    = req.body.examId;
  var studentId = req.body.studentId;
  MyPracticeExamMaster.findOne({_id:examId,StudentId:studentId})
                      // .select("noOfQuestion totalMarks examTime examName")
                      .exec()
                      .then(examQue => {
                        var dataObject = {
                          noOfQuestion          : examQue.totalQuestion,
                          totalMarks            : examQue.totalMarks,
                          questionArrayFromTC   : examQue.answerArray,
                          examTime              : examQue.examTime,
                          examName              : examQue.examName,
                        }
                        console.log('in examQue',examQue);

                        console.log('dataObject ',dataObject.examTime);
                        // dataObject.questionArrayFromTC = examQue.answerArray;
                        if(dataObject.questionArrayFromTC){
                          dataObject.questionArrayFromTC.push({  
                            'finishText' : 'You are about to finish the Test.', 
                             'finishSubtext': 'Please click on below button to finish the Test.',
                             'finish_button': 'Finish The Practice Test' 
                           });
                           console.log('dataObject ',dataObject);
                            res.status(200).json(dataObject);
                        }
                      })
                      .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                          error: err
                          });
                      });

}