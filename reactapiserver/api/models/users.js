const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	// _id			: mongoose.Schema.Types.ObjectId,
	_id			: String,
	createdAt	: {type:Date},
	services	: {
		password:{
					bcrypt:String
				  },
		resume: {
			loginTokens:[
				{
					when: Date,
					hashedToken : String
				}
			]
		}
	},
	username	: {type:String},
	emails		: [
			{
				address:{type:String},
				verified: Boolean
			}
	],
	profile :{
		firstname 		: String,
		lastname  		: String,
		fullName  		: String,
		emailId   		: String,
		mobNumber 		: String,
		status 			: String,
		company 		: String,
		companyId 		: String,
		createdOn		: Date,
		userCode 		: String,
		sentEmailOTP 	: Number,
		receivedEmailOTP : Number,
		franchiseName 	: String,
		teacherName 	: String,
		userProfile		: String,

	},
	roles : [String],
	heartbeat : Date
});

module.exports = mongoose.model('users',userSchema);

//Previous Code :
// const userSchema = mongoose.Schema({
// 	_id: mongoose.Schema.Types.ObjectId,
// 	email:{type:String, required:true, unique: true },
// 	password:{type: String, required:true}
// });
