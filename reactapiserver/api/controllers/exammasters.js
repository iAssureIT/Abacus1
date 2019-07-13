const mongoose	                = require("mongoose");
var moment                      = require('moment');
const ExamMaster                = require('../models/exammasters');
const StudentMaster             = require('../models/studentmasters');
const CompetitionRegisterOrder  = require('../models/competitionregisterorders');

getStudentStatus = function(studentID,competitionId){
  CompetitionRegisterOrder.findOne({studentId:studentID,competitionId:competitionData[i]._id,status:"paid"})
                          .exec()
                          .then(isStudentRegisterForComp=>{
                            if(isStudentRegisterForComp && isStudentRegisterForComp._id){
                              var studentPaymentStatus = "Paid";
                              MyExamMaster.findOne({competitionId:isStudentRegisterForComp.competitionId,StudentId:studentID})
                                          .exec()
                                          .then(examData=>{
                                            return {
                                              studentPaymentStatus  : "Paid",
                                              examDataStatus        : examData.examStatus,
                                              examId                : examData._id,
                                            }
                                          })
                                          .catch(err =>{
                                            console.log(err);
                                            res.status(500).json({
                                              error: err
                                              });
                                          });                
                            }else{
                              return {
                                studentPaymentStatus  : "unPaid",
                                examDataStatus        : "",
                                examId                : "",
                              };
                            }
                          })
                          .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                              error: err
                              });
                          });                
}
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
exports.fetch_exam_details_mainexam = (req,res,next)=>{
  var today           = new Date();
  var todayDate       = moment(today).format('L');
  var currentTime     = moment(today).format('LT');
  StudentMaster.findOne({studentId:req.params.studentId})
               .exec()
               .then(studentData=>{
                 if(studentData){
                  ExamMaster.find({competitionView:"Show"})
                            .sort( { competitionDate:-1} )
                            .exec()
                            .then(competitionData =>{
                              if(competitionData){
                                var competitions = [];
                                // competitionList.map((competitionData,index)=>{
                                for(index = 0 ; index < competitionData.length ; index++){
                                  var competitionDate = new Date(competitionData[index].competitionDate);
                                  competitionData[index].examDate = moment(competitionDate).format('L');
                                  // competitionData[index].EXAMDate = moment(competitionData[index].examDate).format("DD/MM/YYYY");
                                  competitionData[index].viewStatus = competitionData[index].competitionView;
                                  var examTime = new Date(competitionData[index].competitionDate);
                                  var ExamStartTime = moment(currentTime, 'h:mma');
                                  var ExamEndTime   = moment(new Date(competitionData[index].endTime), 'h:mma');
                                  console.log('examTime ',examTime.getTime());
                                  if(today.getTime()< examTime.getTime()){
                                    competitionData[index].examYear = "Accept";
                                  }else{
                                    competitionData[index].examYear = "NotAccept";
                                  }
                            
                                  if(todayDate>competitionData[index].examDate){
                                    competitionData[index].examTimeStatus = "OldExam";
                                  }else if(todayDate<=competitionData[index].examDate){
                                    competitionData[index].examTimeStatus = "NewExam";
                                  }
                                  if(todayDate==competitionData[index].examDate && ExamStartTime > ExamEndTime){
                                    competitionData[index].timeStatus = "invalid";
                                  }else if(todayDate==competitionData[index].examDate && ExamStartTime<ExamEndTime){
                                    competitionData[index].timeStatus = "valid";
                                  }else{
                                    competitionData[index].timeStatus = "nextCompetition";
                                  }
                                  if(todayDate<=competitionData[index].examDate){
                                    competitionData[index].nextExamStatus = "Present"
                                  }else{
                                    competitionData[index].nextExamStatus = "Absent"
                                  }
                                  // competitionData[index].PayDate         = moment(competitionData[index].createdAt).format('MMM Do YYYY');  
                                  // competitionData[index].currentExamDate = moment(competitionData[index].examDate).format("DD/MM/YYYY");
                    
                                  var studentCategory = competitionData[index].competitionExams;
                                  if(studentCategory){
                                    var i                = studentCategory.findIndex(data => data.subCategory == studentData.subCategory);
                                    var categoryWiseExamData = studentCategory[index];
                                    if(categoryWiseExamData){
                                      competitionData[index].examStartStatus = categoryWiseExamData.examStatus;
                                    }
                                  }
                                  var dataID = competitionData[index]._id;
                                  console.log('dataID ',dataID);
                                  var data = getStudentStatus(req.params.studentId,dataID);
                                  competitions.push({
                                    'competitionName'       : competitionData[index].competitionName,
                                    'competitionDate'       : competitionData[index].competitionDate,
                                    'startTime'             : competitionData[index].startTime,
                                    'endTime'               : competitionData[index].endTime,
                                    'examYear'              : competitionData[index].examYear,
                                    'examTimeStatus'        : competitionData[index].examTimeStatus,
                                    'timeStatus'            : competitionData[index].timeStatus,
                                    'nextExamStatus'        : competitionData[index].nextExamStatus,
                                    // 'PayDate'               : competitionData[index].PayDate,
                                    'examStartStatus'       : competitionData[iindex].examStartStatus,
                                    'studentPaymentStatus'  : data.studentPaymentStatus,
                                    'lastInCompExamIdStatus' : data.lastInCompExamIdStatus,
                                    // 'status'          : 
                                  });
                                  if(competitionData.length == competitions.length){
                                    res.status(200).json(competitions);
                                  }
                                }
                              }
                              // res.status(200).json(competitionData);
                            })
                            .catch(err =>{
                              console.log(err);
                              res.status(500).json({
                                error: err
                                });
                            });
                 }else{
                   res.status(404).json({message:"Student Not Found"});
                 }
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



