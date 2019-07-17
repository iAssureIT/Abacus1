const mongoose	                = require("mongoose");
var moment                      = require('moment');
const ExamMaster                = require('../models/exammasters');
const StudentMaster             = require('../models/studentmasters');
const CompetitionRegisterOrder  = require('../models/competitionregisterorders');
const MyExamMaster              = require('../models/myexammasters');

getStudentStatus = function(studentID){
  CompetitionRegisterOrder.find({studentId:studentID,status:"paid"})
                          .exec()
                          .then(isStudentRegisterForComp=>{
                              return isStudentRegisterForComp
                          })
                          .catch(err =>{
                            console.log(err);
                            return({
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
          // .select("result ")
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
  StudentMaster .findOne({studentId:req.params.studentId})
                .exec()
                .then(studentMasterData=>{
                  if(studentMasterData){
                    ExamMaster.findOne({_id:req.params.competitionId})
                              .exec()
                              .then(competitionData =>{
                                  if(competitionData){
                                    var dateformat = moment(new Date(competitionData.competitionDate)).format('MMM Do YYYY');
                                    var CompetitionExamData = competitionData.competitionExams;
                                    if(CompetitionExamData){
                                      console.log('student cat ', studentMasterData.category);
                                      console.log('student subcat ', studentMasterData.subCategory);
                                      console.log('CompetitionExamData ',CompetitionExamData);
                                      var arrIndex = CompetitionExamData.findIndex(function(object,index){ return object.category == studentMasterData.category && object.subCategory == studentMasterData.subCategory});
                                      if(arrIndex){
                                        res.status(200).json({
                                                                competitionData     : competitionData,
                                                                CompetitionExamData : competitionData.competitionExams[arrIndex],
                                                                dateformat          : dateformat,
                                                                studentMasterData   : studentMasterData,
                                                              });
                                      }else{
                                      console.log('comp 1 not found');

                                        res.status(404).json({message:"competition Exam does not exist"})  
                                      }
                                    }else{
                                      res.status(404).json({message:"competition Exam does not exist"})
                                    }
                                  }else{
                                    res.status(404).json({message:"Exam not found"});
                                  }
                              })
                              .catch(err =>{
                                console.log(err);
                                res.status(500).json({
                                  error: err
                                  });
                              });
                  }else{
                    res.status(404).json({message:"Student Not found"});
                  }
                })
                .catch(err =>{
                  console.log(err);
                  res.status(500).json({
                    error: err
                    });
                });      
}

exports.fetch_exam_details_mainexam = (req,res,next)=>{
  console.log('body ',req.body);
  var today           = new Date(req.body.todaydate);
  var todayDate       = moment(today).format('L');
  var currentTime     = moment(today).format('LT');
  ExamMaster.find({competitionView:"Show"})
            .sort( { competitionDate:-1} )
            .exec()
            .then(competitionData =>{
              if(competitionData){
                // console.log('competitionData ',competitionData);
                var competitions = [];
                for(index = 0 ; index < competitionData.length ; index++){
                  var competitionDate = new Date(competitionData[index].competitionDate);
                  competitionData[index].examDate = moment(competitionDate).format('L');
                  competitionData[index].viewStatus = competitionData[index].competitionView;
                  var examTime = new Date(competitionData[index].competitionDate);
                  var ExamStartTime = moment(currentTime, 'h:mma');
                  var ExamEndTime   = moment(competitionData[index].endTime, 'h:mma');
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
                  }else if(todayDate==competitionData[index].examDate && ExamStartTime < ExamEndTime){
                    competitionData[index].timeStatus = "valid";
                  }else{
                    competitionData[index].timeStatus = "nextCompetition";
                  }
                  if(todayDate<=competitionData[index].examDate){
                    competitionData[index].nextExamStatus = "Present"
                  }else{
                    competitionData[index].nextExamStatus = "Absent"
                  }
                  var studentCategory = competitionData[index].competitionExams;
                  if(studentCategory){
                    var i  = studentCategory.findIndex(data => data.subCategory ==req.body.subCategory);
                    var categoryWiseExamData = studentCategory[i];
                    if(categoryWiseExamData){
                      competitionData[index].examStartStatus = categoryWiseExamData.examStatus;
                    }
                  }
                    competitions.push({
                      '_id'                   : competitionData[index]._id,
                      'competitionName'       : competitionData[index].competitionName,
                      'competitionDate'       : competitionData[index].competitionDate,
                      'startTime'             : competitionData[index].startTime,
                      'endTime'               : competitionData[index].endTime,
                      'examYear'              : competitionData[index].examYear,
                      'examTimeStatus'        : competitionData[index].examTimeStatus,
                      'timeStatus'            : competitionData[index].timeStatus,
                      'nextExamStatus'        : competitionData[index].nextExamStatus,
                      'examStartStatus'       : competitionData[index].examStartStatus,
                      'competitionFees'       : competitionData[index].competitionFees,
                      'competitionStatus'     : competitionData[index].competitionStatus,
                      'examDate'              : competitionData[index].examDate,
                      'studentPaymentStatus'  : 'unPaid',
                      'lastInCompExamIdStatus' : '',
                      'examDataStatus'        : '',
                      'examId'                : '',
                    });
                  // }
                }//End of For
                if(competitionData.length == competitions.length){
                 var CompetitionRegOrder =  CompetitionRegisterOrder.find({studentId:req.body.studentID,status:"paid"});
                  if(CompetitionRegOrder) {
                    res.status(200).json({CompetitionRegOrder ,competitionData})
                  }
                  // res.status(200).json(competitions);
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
}


              