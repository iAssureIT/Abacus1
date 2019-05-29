const mongoose	= require("mongoose");
const bcrypt	= require("bcrypt");
const jwt		= require("jsonwebtoken");

const User = require('../models/users');

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
													userCode	  : req.body.password.split("").reverse().join("")
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
	User.findOne({emails:{$elemMatch:{address:req.body.email}}})
		.exec()
		.then(user => {
			var pwd = user.services.password.bcrypt;
			bcrypt.compare(req.body.password,pwd,(err,result)=>{
				if(err){
					return res.status(401).json({
						message: 'Auth failed'
					});		
				}
				if(result){
					const token = jwt.sign({
						email 	: req.body.email,
						userId	:  mongoose.Types.ObjectId(user._id) ,
					},process.env.JWT_KEY,
					{
						expiresIn: "1h"
					}
					);
					return res.status(200).json({
						message: 'Auth successful',
						token: token
					});	
				}
				return res.status(401).json({
					message: 'Auth failed'
				});
			})
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