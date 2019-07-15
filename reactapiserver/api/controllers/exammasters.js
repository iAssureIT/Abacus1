const mongoose	                = require("mongoose");
var moment                      = require('moment');
const ExamMaster                = require('../models/exammasters');
const StudentMaster             = require('../models/studentmasters');
const CompetitionRegisterOrder  = require('../models/competitionregisterorders');
const MyExamMaster              = require('../models/myexammasters');

getStudentStatus = function(studentID,competitionId){
  CompetitionRegisterOrder.findOne({studentId:studentID,competitionId:competitionId,status:"paid"})
                          .exec()
                          .then(isStudentRegisterForComp=>{
                            if(isStudentRegisterForComp && isStudentRegisterForComp._id){
                              var studentPaymentStatus = "Paid";
                              MyExamMaster.findOne({competitionId:isStudentRegisterForComp.competitionId,StudentId:studentID})
                                          .exec()
                                          .then(examData=>{
                                            if(examData){
                                              return {
                                                studentPaymentStatus  : "Paid",
                                                examDataStatus        : examData.examStatus,
                                                examId                : examData._id,
                                              }
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
                                            return({
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

exports.fetch_all_show_exam = (req,res,next)=>{
  console.log('reg.body ',req.body.todaydate);
  var today           = new Date(req.body.todaydate);
  console.log('today ',today);
  var examStatus = '-';
  ExamMaster.find({competitionView:"Show"})
            .sort( { competitionDate:-1} )
            .exec()
            .then(competitionData =>{
                var competitions = [];
                for(index = 0 ; index < competitionData.length ; index++){
                  console.log('Date ',new Date(competitionData[index].competitionDate));
                  if(moment(today).format('YYYY/MM/DD') > moment(competitionData[index].competitionDate).format('YYYY/MM/DD')){
                    examStatus = 'Finished';
                  }else if(today.format('YYYY/MM/DD') == moment(competitionData[index].competitionDate).format('YYYY/MM/DD')){
                    if(today.getTime() < new Date(competitionData[index].endTime).getTime()){
                        examStatus = 'NotFinished';
                    }else if(today.getTime() < new Date(competitionData[index].startTime).getTime()){
                          examStatus = 'NotStarted';
                    }else if(today.getTime() > new Date(competitionData[index].endTime).getTime()){
                        examStatus = 'Finished';
                    }
                  }else{
                    examStatus = 'NotFinished';
                  }
                  if(examStatus != '-'){
                    competitions.push({
                      '_id'                   : competitionData[index]._id,
                      'competitionName'       : competitionData[index].competitionName,
                      'competitionDate'       : competitionData[index].competitionDate,
                      'startTime'             : competitionData[index].startTime,
                      'endTime'               : competitionData[index].endTime,
                      'examYear'              : competitionData[index].examYear,
                      'competitionFees'       : competitionData[index].competitionFees,
                      'examStatus'            : examStatus,
                    });
                  }
                }//End of For
                if(competitionData.length == competitions.length){
                  res.status(200).json(competitions);
                }
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
} 


              