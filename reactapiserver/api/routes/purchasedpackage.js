
const express 	= require("express");
const router 	= express.Router();
const mongoose	= require("mongoose");
var moment = require('moment');
var request = require('request-promise');
const StudentMaster                 = require('../models/studentmasters'); 
const MyPracticeExamMaster          = require('../models/mypracticeexammasters');
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
// Not working
router.get('/:studentID', (req,res,next) => {
    var attemptArray = [];
    var blankCount=[];
    StudentMaster.findOne({studentId:req.params.studentID})
                 .exec()
                 .then(student=>{
                     if(student){
                        MyPracticeExamMaster.findOne({StudentId:req.params.studentID,examStatus:"InCompleted"})
                                          .select("_id")
                                          .exec()
                                          .then(myexam=>{
                                            if(myexam){
                                                console.log('Exam Pending');
                                                res.status(200).json({
                                                    message     : "Exam Pending",
                                                    lastExamId  : myexam._id
                                                });
                                            }else{
                                                PackageQuestionPaperMaster.find({buyerId:req.params.studentID})
                                                                          .exec()
                                                                          .then(quespaper=>{
                                                                              var PackageQPMData = quespaper;
                                                                              var i = 0;
                                                                              var j = 0;
                                                                              var k = 0;
                                                                              var l = 0;
                                                                              if(PackageQPMData && PackageQPMData.length > 0){
                                                                                for(i = 0; i < PackageQPMData.length; i++){
                                                                                    var packageID  = PackageQPMData[i].packageId;
                                                                                    console.log('packageID ',packageID);
                                                                                    if(packageID){
                                                                                        var PackageManagementMasterData = {
                                                                                            "method"  : 'GET',
                                                                                            "uri"     : "http://abacusapi.iassureit.com/packagemanagementmasters/attemptOfpracticetest/"+packageID,
                                                                                            "json"    : true,
                                                                                            "headers": {
                                                                                                "Authorization": "Bearer " + null,
                                                                                                "User-Agent": "My little demo app"
                                                                                              }

                                                                                        };
                                                                                        console.log('PackageManagementMasterData ',PackageManagementMasterData);
                                                                                        if(PackageManagementMasterData){
                                                                                            request(PackageManagementMasterData)
                                                                                                    .then(function(response){
                                                                                                        PackageQPMData[i].AttemptOfPracticeTest = response.AttemptOfPracticeTest;
                                                                                                        attemptArray.push(parseInt(response.AttemptOfPracticeTest));
                                                                                                    })
                                                                                                    .catch(function(err){
                                                                                                        return res.status(404).json({message:"Something went wrong ",err})
                                                                                                    })
                                                                                        }
                                                                                    }
                                                                                }
                                                                                if(i > PackageQPMData.length && attemptArray.length > 0){
                                                                                    var  sorted = attemptArray.slice().sort(function(a, b) {
                                                                                        return a - b;
                                                                                    });
                                                                                    var maxAttempt  = sorted[sorted.length - 1];
                                                                                    for(j = 0 ; j < PackageQPMData.length; j++){
                                                                                        blankCount.push(maxAttempt-PackageQPMData[j].AttemptOfPracticeTest);
                                                                                    }
                                                                                    if(j > PackageQPMData.length && blankCount.length > 0){
                                                                                        for(k=0;k<blankCount.length;k++){
                                                                                            var cnt=blankCount[k];   
                                                                                            for(z=0;z<=cnt;z++){
                                                                                              var obj={"status":"--"};    
                                                                                            
                                                                                             if(PackageQPMData && PackageQPMData.length> 0 ){
                                                                                                for(var l = 0;l<PackageQPMData.length;l++){
                                                                                                   if(PackageQPMData[l].noOfAttempts.length < maxAttempt){
                                                                                                    PackageQPMData[l].noOfAttempts.push(obj);
                                                                                                   }else{
                                                                                                       null
                                                                                                   }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                            obj='';
                                                                                          }
                                                                                        if(k > PackageQPMData.length){
                                                                                            res.status(200).json({
                                                                                                message         : "Question Papaers found",
                                                                                                lastExamId      : '',
                                                                                                PackageQPMData  : PackageQPMData,
                                                                                                attemptArray    : attemptArray,
                                                                                                maxAttempt      : maxAttempt
                                                                                            });            
                                                                                        }
                                                                                    }
                                                                                }
                                                                              }else{
                                                                                res.status(200).json({
                                                                                    message   : "List of Question Papers not found",
                                                                                });
                                                                              }
                                                                          })
                                                                          .catch(err =>{
                                                                            console.log(err);
                                                                            res.status(500).json({
                                                                                error: err
                                                                            });
                                                                       });                                
                                            }
                                          })
                                          .catch(err =>{
                                                console.log(err);
                                                res.status(500).json({
                                                    error: err
                                                });
                                           });                        
                     }else{
                        res.status(200).json({
                            message     : "Student Not Found",
                        }); 
                     }
                 })
                 .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                        });
                });    
});

router.post('/updatequespaper', (req,res,next) =>{
    MyPracticeExamMaster.findOne({_id : req.body.practiceExamId})
                        .exec()
                        .then(practiceExamId=>{
                            if(practiceExamId){
                                var selector = {"questionPaper_id":practiceExamId.examPaperId,"buyerId":req.body.studentId,"packageId" : req.body.packageId ,"order_id":req.body.orderId}
                                console.log('selector = ',selector );
                                PackageQuestionPaperMaster.findOne(selector)
                                .exec()
                                .then(questionPaperDetails=>{
                                    console.log('out questionPaperDetails ',questionPaperDetails);
                                    if(questionPaperDetails){
                                        console.log("in questionPaperDetails ",questionPaperDetails);  
                                        var updateSelector = {_id:questionPaperDetails._id,order_id:req.body.orderId,packageId:req.body.packageId,buyerId:req.body.studentId,questionPaper_id:req.body.practiceExamId};
                                        console.log('updateSelector ',updateSelector);
                                        PackageQuestionPaperMaster  .updateOne(
                                                                        {_id:questionPaperDetails._id,order_id:req.body.orderId,packageId:req.body.packageId,buyerId:req.body.studentId,questionPaper_id:req.body.practiceExamId},
                                                                        {
                                                                            $set:{
                                                                                ["noOfAttempts."+req.body.btnIndex+".status"]:true,
                                                                                ["noOfAttempts."+req.body.btnIndex+".attemptedAt"]:moment().format("MMM Do YY"),
                                                                            }
                                                                        }
                                                                    )
                                                                    .exec()
                                                                    .then(pckquepaper=>{
                                                                        console.log('pckquepaper ',pckquepaper);
                                                                        if(pckquepaper.nModified == 1){
                                                                            res.status(200).json("Package Question Paper Master updated");
                                                                        }else{
                                                                            res.status(200).json("Something went wrong. Please check the values");
                                                                        }
                                                                    })
                                                                    .catch(err =>{
                                                                        console.log(err);
                                                                        res.status(500).json({
                                                                            error: err
                                                                            });
                                                                    });                                
                                    }else{   
                                        res.status(200).json("questionPaperDetails not found");
                                    }
                                })
                                .catch(err =>{
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                        });
                                });
                            }else{
                                res.status(200).json({message:"practiceExamId not found"});
                            }
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                                });
                        });
                  
});

router.post('/startpracticeexam/:examPaperId/:studentID', (req,res,next)=>{
    var todayDate = new Date();
    QuestionPaperMaster .findOne({_id:req.params.examPaperId})
                        .exec()
                        .then(questionPaperMasterData=>{
                            if(questionPaperMasterData){
                                var questionArray =  questionPaperMasterData.questionsArray;
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
                                        const mypracticeexam = new MyPracticeExamMaster({
                                                                                            _id             : new mongoose.Types.ObjectId(),
                                                                                            createdAt	      : todayDate,
                                                                                            StudentId       : req.params.studentID,
                                                                                            examPaperId     : req.params.examPaperId,
                                                                                            originalTime    : questionPaperMasterData.examTime,
                                                                                            examTime        : questionPaperMasterData.examTime,
                                                                                            examName        : questionPaperMasterData.quePaperTitle,
                                                                                            category        : questionPaperMasterData.category,
                                                                                            marksPerQues    : questionPaperMasterData.marksPerQues,
                                                                                            totalQuestion   : (questionPaperMasterData.questionsArray).length,
                                                                                            examType        : questionPaperMasterData.examType,
                                                                                            totalMarks      : questionPaperMasterData.totalMarks,
                                                                                            attemptedQues   : 0,
                                                                                            correctAnswer   : 0,
                                                                                            wrongAnswer     : 0,
                                                                                            totalScore      : 0,
                                                                                            date            : moment(todayDate).format("DD/MM/YYYY"), 
                                                                                            examStatus      : "InCompleted",
                                                                                            answerArray     : tempQueArray
                                                                                        });
                                        mypracticeexam  .save()
                                                        .then(mypracticeexamdata =>{
                                                            res.header("Access-Control-Allow-Origin","*");
                                                            if(mypracticeexam){
                                                                if(mypracticeexam.answerArray.length == tempQueArray.length){
                                                                    res.status(200).json({message:"Practice Exam Created",ID : mypracticeexamdata._id})
                                                                }else{
                                                                    res.status(409).json({message:"Practice Exam Questions not updated properly",ID : mypracticeexamdata._id})
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
                                    }
                                }
                            }else{
                                res.status(409).json({message:"Exam Paper not found"})
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
