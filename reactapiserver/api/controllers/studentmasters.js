const mongoose	= require("mongoose");

const StudentMaster = require('../models/studentmasters');
// const User          = require('../models/users');

exports.studentInfo = (req,res,next)=>{
  var sId = req.params.studentId;
  console.log('studentInfo sId',sId);
  StudentMaster.findOne({studentId:sId})
               .select("studentFirstName studentMiddleName studentLastName mobileNumber studentDOB schoolName franchiseName franchiseId franchiseMobileNumber studentAddress studentCountry studentState studentCity pincode category categoryDisabled studentEmail genderType gender profileEditStatus")
               .exec()
               .then(student =>{
                 if(student){
                   student.categoryDisabled        = 'Disabled';
                   student.updateProfilePermission = student.profileEditStatus;
                   student.submitButtonMsg         = 'Confirm & Update';
                   if(student.submitButtonMsg){
                    console.log('student found ',student.submitButtonMsg);
                    res.status(200).json(student);
                   }
                 }else{
                   console.log('Student not found');
                   User.findOne({_id:sId})
                      .select("profile")
                      .exec()
                      .then(user =>{
                        console.log('users ',user);
                        var studentInfo = {
                          _id                   : user._id,
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
                  //  res.status(200).json('No student found');
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
      // imgSrc         : req.body.imgSrc,
      examFee             : 0,
      categoryArray:[
                      {
                      category       : req.body.category,
                      // category       : 'req.body.category',
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
                  console.log('data ',data);
                  res.status(200).json("User created");
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
      
}


// exports.studentmaster_registraton = (req,res,next) =>{
//   var 
// }



