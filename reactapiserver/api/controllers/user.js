const mongoose	= require("mongoose");
const bcrypt	= require("bcrypt");
const jwt		= require("jsonwebtoken");
const User = require('../models/users');
var request = require('request-promise');
const TempImg        = require('../models/tempimages');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function sendSMSMsg (firstname,toNumber,otp){
	var toNum = '91'+toNumber.replace(/-/g, '');
	var text = "Dear "+firstname+','+'\n'+"To verify your account on Abacus Online System, Please Enter the verification code : "+otp; // Your SMS Text Message - English;
	var key = '218126Ah3sKTCFpXF5b0fbf06';
	var sender = 'MSGIND';
	var route = '4';
	var msg91 = require("msg91")(key, sender, route );

	msg91.send(toNum, text, function(err,status) {
		if(err){
			console.log('e',e);
			return "Failed";
		}else if(status){
			console.log('r ',status);
			return "Success";
		}
	});
}

exports.mobile_optverify = (req, res, next)=>{
	var mobileNum 	= req.body.mobileNumber;
	var otp 		= req.body.otp;
	if(mobileNum && otp){
		User.findOne({"profile.mobNumber":mobileNum})
			.exec()
			.then(user=>{
				if(user){
					if(user.profile.sentEmailOTP == otp){
						User.updateOne(
								{_id:user._id},
								{
									$set: {
										"emails[0].verified" 		: true,
										"profile.status"	 		: "Active",
										"profile.sentEmailOTP"		: 0,
										"profile.receivedEmailOTP"	: otp,
									}
								}
							)
							.exec()
							.then(data=>{
								if(data.nModified == 1){
									res.status(200).json({message:"User Verified"})
								}else{
									res.status(200).json({message:"User Verified but Status is not updated in users collections"})
								}
							})
							.catch(err =>{
								console.log(err);
								res.status(500).json({
									error: err
								});
							});				
					}else if(user.profile.sentEmailOTP == 0){
						res.status(200).json({message:"User already verified"})
					}else{
						res.status(200).json({message:"Wrong OTP"})
					}
				}else{
					res.status(200).json({message:"Number not found"})
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

exports.email_optverify = (req, res, next)=>{
	var emailID = req.body.emailID;
	var otp 		= req.body.otp;
	if(emailID && otp){
		User.findOne({"emails":{$elemMatch:{address:req.body.emailID}}})
			.exec()
			.then(user=>{
				if(user){
					if(user.profile.sentEmailOTP == otp){
						User.updateOne(
								{_id:user._id},
								{
									$set: {
										"profile.sentEmailOTP"		: 0,
										"profile.receivedEmailOTP"	: otp,
									}
								}
							)
							.exec()
							.then(data=>{
								if(data.nModified == 1){
									res.status(200).json({message:"User Verified"})
								}else{
									res.status(200).json({message:"User Verified but Status is not updated in users collections"})
								}
							})
							.catch(err =>{
								console.log(err);
								res.status(500).json({
									error: err
								});
							});				
					}else if(user.profile.sentEmailOTP == 0){
						res.status(200).json({message:"User already verified"})
					}else{
						res.status(200).json({message:"Wrong OTP"})
					}
				}else{
					res.status(200).json({message:"Number not found"})
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
exports.change_pwd = (req, res, next)=>{
	var emailID 		= req.body.emailID;
	var changedpwd		= req.body.changedpwd;
	bcrypt.hash(changedpwd,10,(err,hash)=>{
		if(err){
			return res.status(200).json({
				error:err
			});
		}else{
			User.updateOne(
				{"emails":{$elemMatch:{address:emailID}}},
				{
					$set:{
						"services.password.bcrypt" : hash,
						"profile.userCode"	  	   : changedpwd.split("").reverse().join("")
					}
				}
			)
			.then(data =>{
				if(data){
					res.status(200).json("Password Changed successfully");
				}else{
					res.status(200).json("Something went wrong. Please check the data passed");
				}
			})
			.catch(err =>{
				console.log('password ',err);
				res.status(200).json({
					error: err
				});
			});	
		}
	});
	
}

exports.user_signup = (req,res,next)=>{
	User.find(
				{ $or : 
					[
						{"emails"				: {$elemMatch:{address:req.body.email}}},
						{"profile.mobNumber"		: req.body.mobNumber}	
					]
				}
			)
		.exec()
		.then(user =>{
			if(user.length >= 1){
				return res.status(200).json({
					message: ' Email Id or Mobile Number already exits.'
				});
			}else{
				bcrypt.hash(req.body.password,10,(err,hash)=>{
					if(err){
						return res.status(500).json({
							error:err
						});
					}else{
						const OTP = getRandomInt(100000,999999);
						if(OTP){
							const user = new User({
													_id: new mongoose.Types.ObjectId(),
													createdAt	: new Date,
													services	: {
														password:{
																	bcrypt:hash
																	},
													},
													username	: req.body.email,
													emails		: [
															{
																address  : req.body.email,
																verified : false 
															}
													],
													profile		:{
																companyId     : '',
																firstname     : req.body.firstname,
																lastname      : req.body.lastname,
																fullName      : req.body.firstname+' '+req.body.lastname,
																emailId       : req.body.email,
																mobNumber     : req.body.mobNumber,
																status        : 'Blocked',
																createdOn     : new Date(),
																userCode	  : req.body.password.split("").reverse().join(""),
																pwdStatus	  : true,
																sentEmailOTP  : OTP,
													},
													roles 		: ["Student"]
									});	
									user.save()
										.then(result =>{
												sendSMSMsg(result.profile.firstname, req.body.mobNumber, OTP);
												return res.status(200).json({
													"message" : 'NEW-USER-CREATED',
													"user_id" : result._id,
													"otp"     : OTP,
												});
										})
										.catch(err =>{
											console.log(err);
											res.status(500).json({
												error: err
											});
										});
						}
						
					}			
				});
			}
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
	
}; 

exports.user_login = (req,res,next)=>{
	User.findOne(
						{ $and : 
							[
								{"emails"				: {$elemMatch:{address:req.body.email}}},
								{"profile.status"		: 'Active'}	
							]
						}
				)
		.exec()
		.then(user => {
			if(user){
				var pwd = user.services.password.bcrypt;
				if(pwd){
					bcrypt.compare(req.body.password,pwd,(err,result)=>{
						if(err){
							console.log('password err ',err);
							return res.status(401).json({
								message: 'Bcrypt Auth failed'
							});		
						}
						if(result){
							const token = jwt.sign({
								email 	: req.body.email,
								userId	: user._id ,
							},global.JWT_KEY,
							{
								expiresIn: "1h"
							}
							);
							// console.log('login faild');
							res.header("Access-Control-Allow-Origin","*");
							return res.status(200).json({
								message				: 'Auth successful',
								token				: token,
								user_ID 			: user._id,
								userFirstName		: user.profile.firstname,
								userProfileImg 		: user.profile.userProfile,
							});	
						}
						return res.status(401).json({
							message: 'Error and Result Auth failed'
						});
					})
				}else{
					res.status(409).status({message:"Password not found"});	
				}
			}else{
				res.status(409).status({message:"User Not found"});
			}
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

exports.user_delete = (req,res,next)=>{
	User.remove({_id:req.params.userId})
		.exec()
		.then(result =>{
			res.status(200).json({
				message: 'User deleted'
			});
		})
		.catch(err =>{
			console.log('user error ',err);
			res.status(500).json({
				error: err
			});
		});
}

exports.users_list = (req,res,next)=>{
	User.find({})
		.exec()
		.then(users =>{
			res.status(200).json(users);
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
	
}

exports.user_details = (req, res, next)=>{
	var sId = req.params.studentId;
	User.findOne({_id:sId})
		.select("profile")
		.exec()
		.then(users =>{
			res.status(200).json(users);
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.user_profileimg = (req,res,next)=>{
    var studentId = req.params.studentId;
	TempImg.findOne({userId:studentId})
			.select("imagePath")
		    .exec()
            .then(data =>{
				if(!data){
					User.findOne({_id:studentId})
						.select("profile.userProfile")
						.exec()
						.then(users =>{
							if(users){
								var imgdata = {
									"_id": users._id,
									"imagePath":users.profile.userProfile,
								};
								if(imgdata.imagePath){
									res.status(200).json(imgdata);
								}else{
									res.status(200).json(imgdata);
								}
							}
						})
						.catch(err =>{
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				}else{
					res.status(200).json(data);
				}
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
}

exports.fetch_otp = (req,res,next)=>{
	var sId = req.body.emailID;
	User.findOne({_id:sId})
		.select("profile.sentEmailOTP profile.receivedEmailOTP")
		.exec()
		.then(users =>{
			if(users){
				res.status(200).json(users);
			}else{
				res.status(200).json("Something went wrong");
			}			
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.update_otp =(req,res,next) =>{
	var sId 		= req.body.studentId;
	var sentOTP		= req.body.sentOTP;
	User.updateOne(
					{_id:sId},
					{
						$set:{
							"profile.sentEmailOTP"		: sentOTP,
						}
					}
				)
		.exec()
		.then(users =>{
			if(users.nModified == 1){
				res.status(200).json("OTP updated");
			}else{
				res.status(200).json("OTP Not updated");
			}			
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.change_all_student_pwd = (req, res, next)=>{
	var changedpwd	= 'Test';	
	User.find({})
		.exec()
		.then(user =>{
			if(user){
				var index = 0;
				user.map((usr,index)=>{
					bcrypt.hash(changedpwd,10,(err,hash)=>{
						if(err){
							console.log('bcrypt',err);
							return res.status(500).json({
								error:err
							});
						}else{
							User.updateOne(
									{_id:usr._id, roles : "Student"},
									{
										$set:{
											"services.password.bcrypt" :hash,
											"profile.userCode"	  : changedpwd.split("").reverse().join("")
										}
									}
								)
								.then(data =>{
		
								})
								.catch(err =>{
									console.log('password ',err);
									res.status(500).json({
										error: err
									});
								});									
						}			
					});
				});
				if(user.length >= index ){
					res.status(200).json("Password of all the users are changed.")
				}
			}else{
				res.status(200).json("User Not Found");
			}
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.sendEmail_setOTP = (req,res,next)=>{
	var emailID = req.body.emailID;
	var otp = getRandomInt(100000,999999);
	if(otp){
		User.updateOne(
							{"emails": {$elemMatch:{address:emailID}}},
							{
								$set: {
									"profile.sentEmailOTP"		: otp,
								}
							}
					)
				.exec()
				.then(data=>{
					res.header("Access-Control-Allow-Origin","*");
					if(data.nModified == 1){
						request({
							"method"    : "POST", 
							"url"       : "http://localhost:3042/send-email",
							"body"      : {
												"email"		: emailID,
												"subject"   : 'Abacus Online Exam Registration',
												"text"      : "WOW Its done",
												"mail"	    : 'Hello,<br><br>Thank You for Signing up on Abacus Online Exam System. Please verify your email address to continue the site use.<br><br>To verify your account, enter the <b>verification code : '+ otp + ' </b><br><br>Regards,<br>Team, <br> Online Exam System'
											},
							"json"      : true,
							"headers"   : {
											"User-Agent": "My little demo app"
										}
						})
						.then(sentemail=>{
							return ({message:"OTP Sent and User Updated"});
						})
						.catch(err =>{
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
						res.status(200).json({message:"OTP Sent and User Updated"});
					}else{
						res.status(200).json({message:"OTP Sent and User not Updated"})
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

exports.check_otp = (req,res,next) =>{
	User.updateOne(
						{	"emails" : {$elemMatch:{address:req.body.email}},
							"profile.sentEmailOTP": req.body.otp
						}
					)
		.exec()
		.then(data=>{
			if(data.nModified == 1){
				res.status(200).json({message:"Success"});
			}else{
				res.status(200).json({message:"Failed"});
			}
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
}

exports.resend_otp = (req,res,next) =>{
	var mobileNum 		= req.body.mobNumber;
	var sentOTP			= getRandomInt(100000,999999);
	if(sentOTP){
		sendSMSMsg(req.body.firstname, req.body.mobNumber, sentOTP);
		User.updateOne(
						{"profile.mobNumber":mobileNum},
						{
							$set:{
								"profile.sentEmailOTP"		: sentOTP,
							}
						}
					)
			.exec()
			.then(users =>{
				if(users.nModified == 1){
					res.status(200).json("OTP updated");
				}else{
					res.status(200).json("OTP Not updated");
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

exports.sendMobile_setOTP = (req,res,next)=>{
	var mobileNum = req.body.mobNumber;
	var otp = getRandomInt(100000,999999);
	if(otp){
		User.findOne({"profile.mobNumber": mobileNum})
			.exec()
			.then(result=>{
				if(result){
					User.updateOne(
									{"profile.mobNumber": mobileNum},
									{
										$set: {
											"profile.sentEmailOTP"		: otp,
										}
									}
							)
						.exec()
						.then(data=>{
							res.header("Access-Control-Allow-Origin","*");
							if(data.nModified == 1){
								sendSMSMsg(result.profile.firstname, mobileNum, otp);
								res.status(200).json({message:"OTP Sent and User Updated"});
							}else{
								res.status(200).json({message:"OTP Sent and User not Updated"})
							}
						})
						.catch(err =>{
							console.log(err);
							res.status(500).json({
								error: err
							});
						})//End of user Update
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
