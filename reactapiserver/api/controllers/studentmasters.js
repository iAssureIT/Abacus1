const mongoose	= require("mongoose");

const StudentMaster = require('../models/studentmasters');

const User = require('../models/users');


exports.studentInfo = (req,res,next)=>{
  // var studentInfo = {
  //   _id               : '',
  // 	studentFirstName  : '',
  // 	studentMiddleName : '',
  // 	studentLastName   : '',
	// 	mobileNumber   	  : '',
	//   studentDOB        : '',
	//   schoolName        : '',
	//   franchiseName     : '',
	//   franchiseId       : '',
	//   franchiseMobileNumber  : '',
	// 	studentAddress  : '',
	// 	studentCountry : '',
	// 	studentState   : '',
	// 	studentCity    : '',
	// 	pincode        : '',
	// 	category       : '',
	// 	categoryDisabled : 'disabled',
	// 	studentEmail   : '',
	// 	genderType     : '',
	// 	gender 		     : true,
  // };
  var sId = req.body.studentId;
    StudentMaster.findOne({studentId:sId})
            // .select("studentMiddleName studentDOB schoolName franchiseName companyId franchiseMobileNumber studentAddress studentCountry studentState studentCity pincode category genderType")
		        .exec()
            .then(student =>{
              if(!student){
                User.findOne({_id:sId})
                  .select("profile")
                  .exec()
                  .then(user =>{
                    console.log('users ',user);
                    var studentInfo = {
                      _id               : user._id,
                      studentFirstName  : user.profile.firstname,
                      studentMiddleName : '',
                      studentLastName   : user.profile.lastname,
                      mobileNumber   	  : user.profile.mobNumber,
                      studentDOB        : '',
                      schoolName        : '',
                      franchiseName     : '',
                      franchiseId       : '',
                      franchiseMobileNumber  : '',
                      studentAddress  : '',
                      studentCountry : '',
                      studentState   : '',
                      studentCity    : '',
                      pincode        : '',
                      category       : '',
                      categoryDisabled : 'disabled',
                      studentEmail   : user.profile.emailId,
                      genderType     : '',
                      gender 		     : true,
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
              }else{
                console.log('student ',student);
                var studentInfo = {
                  _id               : student._id,
                  studentFirstName  : student.studentFirstName,
                  studentMiddleName : student.studentMiddleName,
                  studentLastName   : student.studentLastName,
                  mobileNumber   	  : student.mobileNumber,
                  studentDOB        : student.studentDOB,
                  schoolName        : student.schoolName,
                  franchiseName     : student.franchiseName,
                  franchiseId       : '',
                  franchiseMobileNumber  : student.franchiseMobileNumber,
                  studentAddress  : student.studentAddress,
                  studentCountry : student.studentCountry,
                  studentState   : student.studentState,
                  studentCity    : student.studentCity,
                  pincode        : student.pincode,
                  category       : student.category,
                  categoryDisabled : 'disabled',
                  studentEmail   : student.emailId,
                  genderType     : student.genderType,
                  gender 		     : true,
                };
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

exports.user_details = (req, res, next)=>{
	var sId = req.body.studentId;
	User.findOne({_id:sId})
		.select("profile")
		.exec()
		.then(users =>{
			console.log('users ',users);
			res.status(200).json(users);
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