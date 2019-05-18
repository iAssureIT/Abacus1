const mongoose	= require("mongoose");
const bcrypt	= require("bcrypt");
const jwt		= require("jsonwebtoken");

const User = require('../models/users');

//Need to work
exports.user_signup = (req,res,next)=>{
	User.find({emails:{$elemMatch:{address:req.body.email}}})
		.exec()
		.then(user =>{
			if(user.length >= 1){
				console.log('user ',user);
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
										]
			            });	
						user.save()
							.then(result =>{
								console.log('user ',result);
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
	console.log('email ',req.body.email);
	User.findOne({emails:{$elemMatch:{address:req.body.email}}})
		.exec()
		.then(user => {
			console.log("_id ",user);
			var pwd = user.services.password.bcrypt;
			console.log('user fetched  password ',user.services.password.bcrypt);
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