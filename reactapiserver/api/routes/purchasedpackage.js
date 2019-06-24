
/*Need to work */
const express 	= require("express");
const router 	= express.Router();

const StudentMaster                 = require('../models/studentmasters'); 
const MyPracticeExamMaster          = require('../models/mypracticeexammasters');
const PackageOrderMaster            = require('../models/packageordermasters');
const PackageManagementMaster       = require('../models/packagemanagementmasters');
const PackageQuestionPaperMaster    = require('../models/packagequestionpapermasters');
const QuestionPaperMaster           = require('../models/questionpapermasters');

router.patch('/:studentID', (req,res,next) => {
    var attemptArray = [];
    var blankCount=[];
    StudentMaster.findOne({studentId:req.params.studentID})
                 .select("category")
                 .exec()
                 .then(student=>{
                     if(student){
                        MyPracticeExamMaster.findOne({StudentId:studentID,examStatus:"InCompleted"})
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
                                                PackageQuestionPaperMaster.find({buyerId:studentID})
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
                                                                                    PackageManagementMaster .findOne({_id:packageID})
                                                                                                                .select("AttemptOfPracticeTest")
                                                                                                                .exec()
                                                                                                                .then(pckMgmt=>{
                                                                                                                    PackageQPMData[i].AttemptOfPracticeTest = parseInt(pckMgmt.AttemptOfPracticeTest);
                                                                                                                    attemptArray.push(parseInt(pckMgmt.AttemptOfPracticeTest));
                                                                                                                })
                                                                                                                .catch(err =>{
                                                                                                                    console.log(err);
                                                                                                                    res.status(500).json({
                                                                                                                        error: err
                                                                                                                    });
                                                                                                                });                                      
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

router.patch('/updatequespaper', (req,res,next) =>{
    PackageQuestionPaperMaster  .findOne({questionPaper_id:practiceExamId,buyerId:StudentId,packageId : pckgIndex ,order_id:orderId})
                                .exec()
                                .then(questionPaperDetails=>{
                                    PackageQuestionPaperMaster  .updateOne(
                                                                    {_id:questionPaperDetails._id,order_id:orderId,packageId:pckgIndex,buyerId:studentID,questionPaper_id:practiceExamId},
                                                                    {
                                                                        $set:{
                                                                            ["noOfAttempts."+BtnIndex+".status"]:true,
                                                                            ["noOfAttempts."+BtnIndex+".attemptedAt"]:moment().format("MMM Do YY"),
                                                                        }
                                                                    }
                                                                )
                                                                .exec()
                                                                .then(pckquepaper=>{
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
                                })
                                .catch(err =>{
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                        });
                                });              
});

router.patch('/startpracticeexam/:examPaperId/:studentID', (req,res,next)=>{
    QuestionPaperMaster .findOne({_id:req.params.examPaperId})
                        .exec()
                        .then(questionPaperMasterData=>{
                            const mypracticeexam = new MyPracticeExamMaster({
                                                _id             : new mongoose.Types.ObjectId(),
                                                createdAt	    : new Date,
                                                StudentId       : req.params.studentID,
                                                examPaperId     : req.params.ID,
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
                                                date            : moment(new Date).format("DD/MM/YYYY"), 
                                                examStatus      : "InCompleted",
                            });
                            mypracticeexam  .save()
                                            .then(mypracticeexamdata =>{
                                                console.log('mypracticeexamdata ',mypracticeexamdata);
                                            })
                                            .catch(err =>{
                                                console.log(err);
                                                res.status(500).json({
                                                    error: err
                                                });
                                            });
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                                });
                        });
});

module.exports = router;
