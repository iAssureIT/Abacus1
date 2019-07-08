const mongoose	= require("mongoose");
const bcrypt	= require("bcrypt");
const jwt		= require("jsonwebtoken");

const User = require('../models/users');
const TempImg        = require('../models/tempimages');

exports.mobile_optverify = (req, res, next)=>{
	var mobileNum = req.body.mobileNumber;
	res.status(200).json({ message: "Mobile Number ", mobile:mobileNum});
}

exports.email_optverify = (req, res, next)=>{
	var emailID = req.body.emailID;
	res.status(200).json({ message: "Mobile Number ", mobile:mobileNum});
}
exports.change_pwd = (req, res, next)=>{
	var userID 		= req.body.userID;
	var currentPwd 	= req.body.currentPwd.split("").reverse().join(""); 
	var changedpwd	= req.body.changedpwd;
	User.findOne({_id:userID})
		.exec()
		.then(user =>{
			if(user){
				if(currentPwd == user.profile.userCode){
					console.log("Password matched");
					console.log('changepwd ',changedpwd);
					bcrypt.hash(changedpwd,10,(err,hash)=>{
						if(err){
							console.log('bcrypt',err);
							return res.status(500).json({
								error:err
							});
						}else{
							User.updateOne(
									{_id:userID},
									{
										$set:{
											"services.password.bcrypt" :hash,
											"profile.userCode"	  : changedpwd.split("").reverse().join("")
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
									res.status(500).json({
										error: err
									});
								});									
						}			
					});
				}else{
					res.status(200).json("Password does not matched");
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

exports.user_signup = (req,res,next)=>{
	User.find({emails:{$elemMatch:{address:req.body.email}}})
		.exec()
		.then(user =>{
			if(user.length >= 1){
				return res.status(409).json({
					message: ' Email Id already exits.'
				});
			}else{
				bcrypt.hash(req.body.password,10,(err,hash)=>{
					if(err){
						return res.status(500).json({
							error:err
						});
					}else{
						const user = new User({
										_id: new mongoose.Types.ObjectId(),
										createdAt	: new Date,
										// emails[0].address: req.body.email,
										// emails.push({address:req.body.email,verified:false}),
										services	: {
											password:{
														bcrypt:hash
														},
										},
										username	: req.body.email,
										emails		: [
												{
													address  : req.body.email,
													verified : true 
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
													// changPwdVerify: true,
										},
										roles 		: ["Student"]
			            });	
						user.save()
							.then(result =>{
								res.status(201).json({
									message: 'User created'
								})
							})
							.catch(err =>{
								console.log(err);
								res.status(500).json({
									error: err
								});
							});
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
	User.find({emails:{$elemMatch:{address:req.body.email}}})
		.exec()
		.then(user => {
			if(user){
				var pwd = user.services.password.bcrypt;
				console.log('pwd bcrypt : ',pwd);
				console.log('password : ',req.body.password);
				bcrypt.compare(req.body.password,pwd,(err,result)=>{
					if(err){
						console.log('bcrypt failed');
						return res.status(401).json({
							message: 'Bcrypt Auth failed'
						});		
					}
					if(result){
						console.log('login result');
						const token = jwt.sign({
							email 	: req.body.email,
							// userId	: mongoose.Types.ObjectId(user._id) ,
							userId	: user._id ,
						},process.env.JWT_KEY,
						{
							expiresIn: "1h"
						}
						);
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
	console.log('user id ',req.params.userId);
	User.remove({_id:req.params.userId})
		.exec()
		.then(result =>{
			console.log('user delete ',result);
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

exports.user_details = (req, res, next)=>{
	var sId = req.params.studentId;
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

exports.user_profileimg = (req,res,next)=>{
	console.log('user_profileimg');
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
								console.log('img 1',users);
								console.log('img 2',users.profile);								
								console.log('img 3',users.profile.userProfile);
								var imgdata = {
									"_id": users._id,
									"imagePath":users.profile.userProfile,
								};
								if(imgdata.imagePath){
									console.log('imgdata if',imgdata);
									res.status(200).json(imgdata);
								}else{
									console.log('imgdata else',imgdata);
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
	var sId = req.body.studentId;
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
	console.log('update otp');
	var sId 		= req.body.studentId;
	var sentOTP		= req.body.sentOTP;
	var receivedOTP = req.body.receivedOTP;
	User.updateOne(
					{_id:sId},
					{
						$set:{
							"profile.sentEmailOTP"		: sentOTP,
							"profile.receivedEmailOTP"	: receivedOTP
						}
					}
				)
		.exec()
		.then(users =>{
			if(users.nModified == 1){
				res.status(200).json("OPT updated");
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
									// if(data){
									// 	res.status(200).json("Password Changed successfully");
									// }else{
									// 	res.status(200).json("Something went wrong. Please check the data passed");
									// }
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


