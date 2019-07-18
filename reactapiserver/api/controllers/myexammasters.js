const mongoose	= require("mongoose");
var request = require('request-promise');
const MyExamMaster = require('../models/myexammasters');

exports. fetch_all_show_exam = (req,res,next) =>{
    console.log('fetch all');
    MyExamMaster.find({})
            // .select("examStatus")
            .exec()
            .then(data =>{
                console.log('data ',data);
                res.status(200).json(data);
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
}

exports.fetch_incomplete_exams = (req,res,next) => {
    var studentId       = req.params.studentId;
    MyExamMaster.find({StudentId:studentId,examStatus:"InCompleted"})
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
exports.fetch_student_incomplete_exams = (req,res,next) => {
    var studentId       = req.params.studentId;
    var competitionId   = req.params.competitionId;
    MyExamMaster.find({StudentId:studentId,competitionId:competitionId,examStatus:"InCompleted"})
            .select("competitionName examDate")
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
exports.fetch_mainexam_certificate = (req,res,next)=>{
    var competitionId = req.params.competitionId;
    var studentId     = req.params.studentId;
    MyExamMaster.find({competitionId:competitionId,StudentId:studentId, $and : [{$or : [{rank : "1st"},{rank : "2nd"},{rank:"3rd"},{rank:"Consolation"}]}]})
            .select("fullName rank competitionName examDate")
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

exports.fetch_participationexam_certificate = (req,res,next) => {
    var competitionId = req.params.competitionId;
    var studentId     = req.params.studentId;
    MyExamMaster.find({competitionId:competitionId,StudentId:studentId})
            .select("fullName competitionName examDate examSolvingTime examStatus")
            .exec()
            .then(data =>{
            //   console.log('data ',data);
                
                res.status(200).json({data : data,index:req.params.index});
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
}

exports.fetch_mainexam_student = (req,res,next) => {
    var studentId     = req.params.studentId;
    MyExamMaster.find({StudentId:studentId,examStatus:"Completed"})
            .select("competitionName examDate category totalQuestion attemptedQues correctAnswer wrongAnswer examSolvedTime totalScore")
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

///exammasters/:categoryname/:subCategory/:competitionId/:startRange/:dataRange
exports.fetch_competition_result_view = (req,res,next) =>{
    var categoryName    = req.params.categoryname;
    var subCategory     = req.params.subCategory;
    var competitionId   = req.params.competitionId;
    var startRange      = parseInt(req.params.startRange);
    var dataRange       = parseInt(req.params.dataRange);
    
    if(categoryName == "all"){
        MyExamMaster.find({competitionId:competitionId})
                    .sort({totalScore:-1,examSolvedTime:1})
                    .skip(startRange)
                    .limit(dataRange)
                    .select("totalMarks StudentId attemptedQues competitionName firstName lastName totalQuestion totalScore examSolvedTime status rank category subCategory studImg")
                    .exec()
                    .then(competition =>{
                        res.status(200).json(competition);
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
    }else{
        if(subCategory == "all"){
            MyExamMaster.find({competitionId:competitionId,category:categoryName})
                        .sort({totalScore:-1,examSolvedTime:1})
                        .skip(startRange)
                        .limit(dataRange)
                        .select("totalMarks StudentId attemptedQues competitionName firstName lastName totalQuestion totalScore examSolvedTime status rank category subCategory studImg")
                        .exec()
                        .then(competition =>{
                            res.status(200).json(competition);
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
        }else{
            MyExamMaster.find({competitionId:competitionId,category:categoryName,subCategory:subCategory})
                        .sort({totalScore:-1,examSolvedTime:1})
                        .skip(startRange)
                        .limit(dataRange)
                        .select("totalMarks StudentId attemptedQues competitionName firstName lastName totalQuestion totalScore examSolvedTime status rank category subCategory studImg")
                        .exec()
                        .then(competition =>{
                            res.status(200).json(competition);
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
        }
    }
}

exports.search_student_competition_result_view = (req,res,next) =>{
    var categoryName    = req.params.categoryname;
    var studenName     = req.params.studentname;
    var competitionId   = req.params.competitionId;
    console.log('categoryName -> ',categoryName,' studenName -> ',studenName,' competitionId -> ',competitionId);    
    if(categoryName == "all"){
        console.log('category name is all');
        MyExamMaster.find({competitionId:competitionId,fullName:studenName})
                    .select("totalMarks StudentId attemptedQues competitionName firstName lastName totalQuestion totalScore examSolvedTime status rank category subCategory studImg")
                    .exec()
                    .then(competition =>{
                        res.status(200).json(competition);
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
    }else{
        console.log('category name is not all');
        MyExamMaster.find({competitionId:competitionId,category:categoryName,fullName:studenName})
                    .select("totalMarks StudentId attemptedQues competitionName firstName lastName totalQuestion totalScore examSolvedTime status rank category subCategory studImg")
                    .exec()
                    .then(competition =>{
                        res.status(200).json(competition);
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
    }
}

exports.fetch_exam_student_dashboard = (req,res,next) => {
    console.log('fetch_exam_student_dashboard');
    var studentId     = req.params.studentId;
    MyExamMaster.find({StudentId:studentId})
            .select("competitionName category totalScore examStatus competitionId")
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
   
exports.update_myexammaster = (req,res,next) =>{
    MyExamMaster.update(
                            {_id : req.params.ID},
                            {
                                $set:{
                                    "examStatus":"Completed",
                                }
                            }
                        )
                .exec()
                .then(data =>{
                    if(data.nModified == 1){
                        res.status(200).json({message: "Exam Completed"});
                    }else{
                        res.status(200).json({message: "Something Went Wrong"});
                    }
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
}

exports.getMainExamQuestions = (req,res,next) =>{
    MyExamMaster.findOne({_id:req.params.competitionId,StudentId: req.params.studentId,examType:"Final Exam"})
                .exec()
                .then(postData=>{
                    console.log('postData ',postData);
                    if(postData){
                        var questionArrayFromTC = postData.answerArray;
                        if(questionArrayFromTC){
                            questionArrayFromTC.push({'finishText' : 'You are about to finish the Exam.', 
                                            'finishSubtext': 'Please click on below button to finish the Exam.',
                                            'finish_button': 'Finish The  Exam' });
                            var dataObject = {
                                "noOfQuestion"          : questionArrayFromTC.length-1,
                                "totalMarks"            : postData.totalMarks,
                                "questionArrayFromTC"   : questionArrayFromTC,
                                "examName"              : postData.examName,
                                "examStatus"            : postData.examStatus,
                            }
                            if(dataObject){
                                res.status(200).json(dataObject);
                            }else{
                                res.status(200).json({message:"Something went wrong"});    
                            }
                        }else{
                            res.status(200).json({message:"Question's Answer not found"});
                        }
                    }else{
                        res.status(200).json({message:"Exam Not found"});
                    }
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
}

exports.getmainexamlastvisitedquestion = (req,res,next)=>{
    MyExamMaster.findOne({"_id":req.params.competitionId})
                .select("lastVisitedQuestion lastVisitedQAnswer")
                .exec()
                .then(studentAnserSheet=>{
                    if(studentAnserSheet){
                        res.status(200).json(studentAnserSheet);
                    }else{
                        res.status(200).json({message:"Exam not found"});
                    }
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
}

exports.practiceExamResult = (req,res,next)=>{
    console.log('practiceExamResult');
    MyExamMaster.findOne({_id:req.params.competitionId})
                .select("originalTime examTime examName category totalQuestion attemptedQues correctAnswer wrongAnswer totalScore date totalMarks studentImageArray")
                .exec()
                .then(studentAnswerSheet=>{
                    if(studentAnswerSheet){
                        var data = {
                            "totalScore"    : studentAnswerSheet.totalScore,
                            "totalMarks"    : studentAnswerSheet.totalMarks,
                            "originalTime"  : studentAnswerSheet.originalTime,
                            "examTime"      : studentAnswerSheet.examTime,
                            "examName"      : studentAnswerSheet.examName,
                            "category"      : studentAnswerSheet.category,
                            "totalQuestion" : studentAnswerSheet.totalQuestion,
                            "attemptedQues" : studentAnswerSheet.attemptedQues,
                            "correctAnswer" : studentAnswerSheet.correctAnswer,
                            "wrongAnswer"   : studentAnswerSheet.wrongAnswer,
                            "date"          : studentAnswerSheet.date,
                            "percentage"    : (parseInt(studentAnswerSheet.totalScore) / parseInt(studentAnswerSheet.totalMarks)) * 100
                        };
                        if(data){
                            res.status(200).json(data);
                        }
                    }else{
                        res.status(200).json({message:"Exam not found"});
                    }
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
}

exports.updateExamTimeAndStudenAnswer = (req,res,next)=>{
    var answer = "";
    console.log('updateExamTimeAndStudenAnswer body ',req.body);
    MyExamMaster.findOne({"_id":req.body.examId})
                .exec()
                .then(examAnswerData=>{
                    if(examAnswerData){
                        if(req.body.studAnswer == examAnswerData.answerArray[req.body.index]){
                            answer = 'Correct';
                        }else{
                            answer = 'Wrong';
                        }
                        if(answer != ""){
                            MyExamMaster.update(
                                            {"_id":req.body.examId},
                                            {
                                                $set:{
                                                    'examSolvingTime'                       : req.body.examTime,
                                                    'lastVisitedQuestion'                   : parseInt(req.body.index),
                                                    'lastVisitedQAnswer'                    : req.body.studAnswer,
                                                    ['answerArray.'+req.body.index+'.attempted']     : "Yes",
                                                    ['answerArray.'+req.body.index+'.studentAnswer'] : req.body.studAnswer,
                                                    ['answerArray.'+req.body.index+'.answer']        : req.body.answer,
                                                }
                                            }
                                        )
                                        .exec()
                                        .then(data=>{
                                            if(data.nModified == 1){
                                                res.status(200).json({message:"Answer updated"})
                                            }else{
                                                res.status(200).json({message:"Answer not updated"});                                                
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
                        res.status(200).json({message:"Exam Not found"});
                    }
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
}

exports.getAlreadySolvedQuesAns = (req,res,next) =>{
    MyExamMaster.findOne({"_id":req.params.examId})
                .exec()
                .then(answerData=>{
                    var answerDataArray = answerData.answerArray[req.params.index];	
                    if(answerDataArray){
                        var data =  ['getStudAns',answerDataArray.studentAnswer];
                        if(data){
                            res.status(200).json(data);
                        }else{
                            res.status(409).json({message:"Something went wrong"});    
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
}

exports.ExamMarksUpdate = (req,res,next) =>{
    console.log('ExamMarksU[pdate');
    MyExamMaster.findOne({"_id":req.params.examId})
                .exec()
                .then(myExamMasterData=>{
                    if(myExamMasterData){
                        var answeArrayLen = myExamMasterData.answerArray.length;
                        var correctAnswer = myExamMasterData.answerArray.filter(function(mapData){
                                        return mapData.answer === "Correct";
                                    }).length;

                        var wrongAnswer  = myExamMasterData.answerArray.filter(function(mapData){
                                            return mapData.answer === "Wrong";
                                        }).length;

                        var attepmted  = myExamMasterData.answerArray.filter(function(mapData){
                                            return mapData.attempted === "Yes";
                                        }).length;
                        var totalScore = parseInt(correctAnswer ) * parseInt(myExamMasterData.marksPerQuestion);
                        var m1 = myExamMasterData.examTime;
                        var m2 = req.params.examsolvingtime;
                        console.log('m2 ',m2);
                        if(m1 && m2){
                            var min1 = m1.split(":");
                            var min2 = m2.split(":");
                            if(min1[1] =="00" && min2[1]=="00"){
                                var examSolvedTime = min1[0]-min2[0];
                                var examSolvedTime =  examSolvedTime < 10 ? "0"+ examSolvedTime : examSolvedTime;
                                var examSolvedTime = examSolvedTime+":00";
                            }else{  
                                if(min1[1]=="00"){
                                    min1[0]-=1;
                                }
                                var res1 = min1[0]-min2[0];
                                res1 = res1 <10 ? "0"+res1 : res1;
                                if(min1[1]>=min2[1]){
                                    var res2 = (min1[1]=="00") ? 60-min2[1] : min1[1]-min2[1];
                                }else{
                                    var res2 = (min1[1]=="00") ? 60-min2[1] : min2[1]-min1[1];
                                }
                                res2 = res2 < 10 ? "0"+res2 : res2;
                                if(res2==60){
                                    res1+=1;res2=0;
                                }
                                var examSolvedTime = res1+":"+res2;
                            }
                            if(examSolvedTime){
                                MyExamMaster.update(
                                                {_id: req.params.examId},
                                                {
                                                    $set:{
                                                        "totalQuestion"     : answeArrayLen,
                                                        "attemptedQues"     : attepmted,
                                                        "correctAnswer"     : correctAnswer,
                                                        "wrongAnswer"       : wrongAnswer,
                                                        "totalScore"        : totalScore,
                                                        "examSolvedTime"    : examSolvedTime,
                                                        "examSolvingTime"   : req.params.examsolvingtime,
                                                        "examStatus"        : "Completed",
                                                        "status"            : "Attempted",
                                                    }
                                                }
                                        )
                                        .exec()
                                        .then(data=>{
                                            if(data.nModified){
                                                res.status(200).json({message:"Exam Updated"});
                                            }else{
                                                res.status(200).json({message:"Exam not Updated"});
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
                            res.status(200).json({message:"It seams there is some isssue with Time"});    
                        }
                    }else{
                        res.status(200).json({message:"Exam Not Found"});
                    }
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
}

exports.FinishExam = (req,res,next) =>{
    MyExamMaster.update(
                        {_id: req.params.examId},
                        {
                            $set:{
                                "examStatus"        : "Completed",
                            }
                        }
                )
                .exec()
                .then(data=>{
                    if(data.nModified){
                        res.status(200).json({message:"Exam Completed"});
                    }else{
                        res.status(200).json({message:"Exam not Completed"});
                    }
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
}

exports.saveimgs = (req,res,next) =>{
    MyExamMaster.updateOne(
                    {_id: req.body.examId},
                    {
                        $push:{
                            'studentImageArray':{
                                'studentImage':req.body.link
                            }
                          }
                    }
            )
            .exec()
            .then(data=>{
                if(data.nModified){
                    res.status(200).json({message:"Exam updated"});
                }else{
                    res.status(200).json({message:"Exam not updated"});
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
}

exports.liststudentgivenexam = (req,res,next) =>{
    MyExamMaster.find({competitionId:competitionList[i].competitionId,StudentId:req.studentId})
    res.status(200).json(req.body)
}