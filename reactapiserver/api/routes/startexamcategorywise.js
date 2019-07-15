
const express 	= require("express");
const router 	= express.Router();
const mongoose	= require("mongoose");
var moment      = require('moment');

const StudentMaster                 = require('../models/studentmasters'); 
const ExamMaster                    = require('../models/exammasters');
const PackageOrderMaster            = require('../models/packageordermasters');
const PackageManagementMaster       = require('../models/packagemanagementmasters');
const PackageQuestionPaperMaster    = require('../models/packagequestionpapermasters');
const QuestionPaperMaster           = require('../models/questionpapermasters');

shuffle = function(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;
	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
	}
	return array;
}

router.post('/:compId/:studentID', (req,res,next)=>{
    var todayDate = new Date();
    StudentMaster.findOne({"_id":studentId.req.params.studentId})
                .exec()
                .then(studentData=>{
                    if(studentData){
                        ExamMaster  .findOne({_id:req.params.compId,competitionStatus:"start"})
                                    .exec()
                                    .then(examMasterData=>{
                                        if(examMasterData){
                                            var studentCategory = 	examMasterData.competitionExams;
                                            if(studentCategory){
                                                var index = studentCategory.findIndex(data => data.subCategory == studentData.subCategory);
                                                var categoryWiseExamData =studentCategory[index];
                                                if(categoryWiseExamData){
                                                    QuestionPaperMaster .findOne({_id:categoryWiseExamData.questionPaperId})
                                                                        .exec()
                                                                        .then(quesPaperData=>{
                                                                            if(quesPaperData){
                                                                                var questionArray =  quesPaperData.questionsArray;
                                                                                if(questionArray){
                                                                                    var questionArray1 = shuffle(questionArray);
                                                                                    var tempQueArray = [];
                                                                                    for(i = 0 ; i < questionArray1.length ;i++){
                                                                                        tempQueArray.push({
                                                                                            'questionNumber'  : i,
                                                                                            'questionId'      : questionArray1[i].questionId,
                                                                                            'question'        : questionArray1[i].question,
                                                                                            'A'               : questionArray1[i].A,
                                                                                            'B'               : questionArray1[i].B,
                                                                                            'C'               : questionArray1[i].C,
                                                                                            'D'               : questionArray1[i].D,
                                                                                            'correctAnswer'   : questionArray1[i].correctAnswer,
                                                                                            'attempted'       :'no',
                                                                                            'studentAnswer'  : '',
                                                                                            'answer'         : '',
                                                                                            'dummyId'        : '',
                                                                                            'indicatorClass' : '',
                                                                                        });
                                                                                    }
                                                                                    if(tempQueArray.length == questionArray1.length){
                                                                                        const myexammaster = new MyExamMaster({
                                                                                                                "StudentId"             : req.params.studentId,
                                                                                                                "companyId"             : studentData.companyId,
                                                                                                                "franchise_id"          : studentData.franchiseId,
                                                                                                                "firstName"             : studentData.studentFirstName,
                                                                                                                "lastName"              : studentData.studentLastName,
                                                                                                                "fullName"              : studentData.studentFirstName+' '+studentData.studentLastName,
                                                                                                                "studImg"               : studentData.imgSrc,
                                                                                                                "competitionId"         : examMasterData._id,
                                                                                                                "competitionName"       : examMasterData.competitionName,
                                                                                                                "examDate"              : examMasterData.competitionDate,
                                                                                                                "examDateFormat"        : new Date(examMasterData.competitionDate),
                                                                                                                "category"              : studentData.category,
                                                                                                                "subCategory"           : studentData.subCategory,
                                                                                                                "paperName"             : categoryWiseExamData.questionPaperId,
                                                                                                                "examTime"              : categoryWiseExamData.examDuration,
                                                                                                                "examSolvingTime"       : categoryWiseExamData.examDuration,
                                                                                                                "examSolvedTime"        : '',
                                                                                                                "paperTitle"            : categoryWiseExamData.paperTitle,
                                                                                                                "examType"		        : "Final Exam",
                                                                                                                "examFees"              : examMasterData.competitionFees,
                                                                                                                "totalMarks"            : categoryWiseExamData.totalMarks,
                                                                                                                "marksPerQuestion"      : categoryWiseExamData.marksPerQuestion,
                                                                                                                "totalQuestion"         : 0,
                                                                                                                "attemptedQues"         : 0,
                                                                                                                "correctAnswer"         : 0,
                                                                                                                "wrongAnswer"           : 0,
                                                                                                                "totalScore"            : 0,
                                                                                                                "createdAt"             : new Date(),
                                                                                                                "status"                : 'Appearing', 
                                                                                                                "examStatus"            : "InComplete",
                                                                                                                "answerArray"           : tempQueArray,
                                                                                                                "studentImageArray"     :[],
                                                                                                            });
                                                                                            myexammaster.save()
                                                                                                        .then(myexammasterData =>{
                                                                                                            if(myexammasterData){
                                                                                                                if(myexammasterData.answerArray.length == tempQueArray.length){
                                                                                                                    res.status(200).json({message:"Exam Created",ID : myexammasterData._id})
                                                                                                                }else{
                                                                                                                    res.status(409).json({message:"Exam Questions not updated properly",ID : myexammasterData._id })
                                                                                                                }
                                                                                                            }else{
                                                                                                                res.status(409).json({message:"Somthing went wrong. Practice Exam Not Created"})
                                                                                                            }
                                                                                                                                
                                                                                                        })
                                                                                                        .catch(err =>{
                                                                                                            console.log(err);
                                                                                                            res.status(500).json({
                                                                                                                error: err
                                                                                                            });
                                                                                                        });
                                                                                    }else{
                                                                                        res.status(409).status({message:"Number of questions are less"});    
                                                                                    }
                                                                                }else{
                                                                                    res.status(409).status({message:"Questions not found"});    
                                                                                }
                                                                            }else{
                                                                                res.status(409).status({message:"Question Paper not found"});                            
                                                                            }
                                                                        })
                                                                        .catch(err =>{
                                                                            console.log(err);
                                                                            res.status(500).json({
                                                                                error: err
                                                                            });
                                                                        });
                                                }else{
                                                    res.status(409).status({message:"Student Category not found"});        
                                                }
                                            }
                                        }else{
                                            res.status(409).status({message:"Comptation not found"});
                                        }
                                            
                                    })
                                    .catch(err =>{
                                        console.log(err);
                                        res.status(500).json({
                                            error: err
                                        });
                                    });                    
                    }else{
                        res.status(409).json({message:"Student not found"});
                    }
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
    
});

module.exports = router;
