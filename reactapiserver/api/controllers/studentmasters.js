const mongoose	= require("mongoose");

const StudentMaster = require('../models/studentmasters');
const User          = require('../models/users');
const Notification  = require('../models/notificationmasters');
const SiteDowntime  = require('../models/siteshutdowntimes');

exports.fetch_student = (req,res,next)=>{
  var sId = req.params.student_ID;
    StudentMaster.findOne({studentId:sId})
            .select("subCategory studentFirstName studentMiddleName studentLastName studentFullName mobileNumber studentDOB schoolName franchiseName franchiseId franchiseMobileNumber studentAddress studentCountry studentState studentCity pincode category categoryDisabled studentEmail genderType gender profileEditStatus status competitionPaymentStatus notificationStatus downTimeStatus companyId")
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
exports.studentInfo = (req,res,next)=>{
  var sId = req.params.studentId;
  StudentMaster.findOne({studentId:sId})
               .select("studentFirstName studentMiddleName studentLastName mobileNumber studentDOB schoolName franchiseName franchiseId franchiseMobileNumber studentAddress studentCountry studentState studentCity pincode category categoryDisabled studentEmail genderType gender profileEditStatus notificationStatus downTimeStatus companyId updateProfilePermission imgSrc")
               .exec()
               .then(student =>{
                 if(student){
                   var studentInfo = {
                          studentFirstName      : student.studentFirstName,
                          studentMiddleName     : student.studentMiddleName,
                          studentLastName       : student.studentLastName,
                          mobileNumber   	      : student.mobileNumber,
                          studentDOB            : student.studentDOB,
                          schoolName            : student.schoolName,
                          franchiseName         : student.franchiseName,
                          franchiseId           : student.franchiseId,
                          franchiseMobileNumber : student.franchiseMobileNumber,
                          studentAddress        : student.studentAddress,
                          studentCountry        : student.studentCountry,
                          studentState          : student.studentState,
                          studentCity           : student.studentCity,
                          pincode               : student.pincode,
                          category              : student.category,
                          categoryDisabled      : 'disabled',
                          studentEmail          : student.studentEmail,
                          genderType            : student.genderType,
                          gender 		            : student.gender,
                          updateProfilePermission: student.profileEditStatus,
                          profileEditStatus     : student.profileEditStatus,
                          notificationStatus    : student.notificationStatus,
                          downTimeStatus        : student.downTimeStatus,
                          companyId             : student.companyId,
                          submitButtonMsg       : 'Confirm & Update',
                          userProfile           : student.imgSrc,
                   }
                   studentInfo.submitButtonMsg         = 'Confirm & Update';
                   if(studentInfo.userProfile){
                    res.status(200).json(studentInfo);
                   }
                 }else{
                   User.findOne({_id:sId})
                      .select("profile")
                      .exec()
                      .then(user =>{
                        var studentInfo = {
                          _id                   : '',
                          studentFirstName      : user.profile.firstname,
                          studentMiddleName     : '',
                          studentLastName       : user.profile.lastname,
                          mobileNumber   	      : user.profile.mobNumber,
                          studentDOB            : '',
                          schoolName            : '',
                          franchiseName         : '',
                          franchiseId           : '',
                          franchiseMobileNumber : '',
                          studentAddress        : '',
                          studentCountry        : '',
                          studentState          : '',
                          studentCity           : '',
                          pincode               : '',
                          category              : '',
                          categoryDisabled      : 'disabled',
                          studentEmail          : user.profile.emailId,
                          genderType            : '',
                          gender 		            : true,
                          submitButtonMsg       : 'Confirm & Register'
                        };
                        if(studentInfo){
                          res.status(200).json(studentInfo);
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
}

exports.getFranchiseName = (req,res,next)=>{
  var studentId = req.body.studentId;
  StudentMaster.findOne({"studentId":studentId})
               .select("franchiseName")
               .exec()
               .then(studentFranchise =>{
                 res.status(200).json(studentFranchise)
                })
                .catch(err =>{
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
}

exports.fetch_student_status = (req,res,next)=>{
  var sId = req.body.studentId;
    StudentMaster.findOne({studentId:sId})
            .select("profileEditStatus")
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

exports.insert_student_registration = (req,res,next) =>{
    var studentMaster = new StudentMaster({
      _id                 : new mongoose.Types.ObjectId(),
      studentId           : req.body.id,
      studentFirstName    : req.body.studentFirstName,
      studentMiddleName   : req.body.studentMiddleName,
      studentLastName     : req.body.studentLastName,
      mobileNumber        : req.body.mobileNumber,
      studentDOB          : req.body.studentDOB,
      studentAge          : req.body.studentAge,
      schoolName          : req.body.schoolName,
      studentAddress      : req.body.studentAddress,
      studentCountry      : req.body.studentCountry,
      studentState        : req.body.studentState,
      studentCity         : req.body.studentCity,
      pincode             : req.body.pincode,
      studentEmail        : req.body.studentEmail,
      genderType          : req.body.genderType,
      examFee             : 0,
      categoryArray:[
                      {
                      category       : req.body.category,
                      subCategory    : req.body.subCategory,
                      examStatus     : 'Not Completed',
                      status         : "UnPaid",
                      createdAt      : new Date(),
                    }
                  ],
      createdAt      : new Date(),      
    });
    studentMaster.save()
                .then(data =>{
                  res.status(200).json("User created");
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
      
}

exports.update_notificationStatus = (req,res,next) =>{
  switch(req.params.statustype){
    case 'notificationstatus' :
      StudentMaster .update(
                          {_id:req.params.studentId},
                          {
                            $set:{
                              'notificationStatus' : req.params.status
                            }
                          }
                    )
                    .exec()
                    .then(data=>{
                      if(data.nModified == 1){
                        res.status(200).json({message:"Status Updated"})
                      }else{
                        res.status(200).json({message:"Something went wrong"})
                      }
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(500).json({
                        error: err
                      });
                    });
      break;
    case 'downtimestatus'     :
      StudentMaster .update(
                          {_id:req.params.studentId},
                          {
                            $set:{
                              'downTimeStatus' : req.params.status
                            }
                          }
                    )
                    .exec()
                    .then(data=>{
                      if(data.nModified == 1){
                        res.status(200).json({message:"Status Updated"})
                      }else{
                        res.status(200).json({message:"Something went wrong"})
                      }
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(500).json({
                        error: err
                      });
                    });
      break;
    default                   :
      res.status(200).json({message:"Invalid statustype"})
  }
}

exports.fetch_notification_student = (req,res,next) =>{
  StudentMaster.findOne({_id:req.params.studentId})
               .select("notificationStatus downTimeStatus")
               .exec()
               .then(student=>{
                 if(student.notificationStatus == 'Unread'){
                  Notification.find({status : "Broadcast"})
                              .exec()
                              .then(notification=>{
                                if(student.downTimeStatus == 'Unread'){
                                  SiteDowntime.find({})
                                              .exec()
                                              .then(downtime=>{
                                                res.status(200).json({
                                                  notificationStatus : notification,
                                                  downtimestatue : downtime
                                                });
                                              })
                                              .catch(err => {
                                                console.log(err);
                                                res.status(500).json({
                                                  error: err
                                                });
                                              });
                                 }else{
                                  res.status(200).json({
                                    notificationStatus : notification,
                                    downtimestatue : []
                                  });
                                 }
                              })
                              .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                  error: err
                                });
                              });               
                 }else{
                  if(student.downTimeStatus == 'Unread'){
                    SiteDowntime.find({})
                                .exec()
                                .then(downtime=>{
                                  res.status(200).json({
                                    notificationStatus : notification,
                                    downtimestatue : downtime
                                  });
                                })
                                .catch(err => {
                                  console.log(err);
                                  res.status(500).json({
                                    error: err
                                  });
                                });
                   }else{
                    res.status(200).json({
                      notificationStatus : notification,
                      downtimestatue : []
                    });
                   }
                 }
               })
               .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
}




