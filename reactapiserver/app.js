const express = require ('express');
const app = express();
const morgan = require('morgan');// morgan call next function if problem occure
const bodyParser = require('body-parser');// this package use to formate json data 
const mongoose = require ('mongoose');

// Routes which should handle requests
const userRoutes 			= require('./api/routes/users');
const packageRoutes 		= require('./api/routes/packagemanagementmasters');
const instructionRoutes 	= require('./api/routes/instructionmasters'); 
const certificatesRoutes	= require('./api/routes/certificates');
const myAccountRoutes		= require('./api/routes/myaccount');
const practiceExamRoutes	= require('./api/routes/practiceexam');
const mainExamRoutes		= require('./api/routes/mainexam');
const categoriesRoutes		= require('./api/routes/categories');
const compentionRoutes		= require('./api/routes/competition');



mongoose.connect('mongodb://localhost/onlineExamSystem',{
	useNewUrlParser: true
})
mongoose.promise =global.Promise;

// process.env.MANGO_ATLAS_PW envirnmaent variable name
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));// urlencode true and false simple-body url data
app.use(bodyParser.json());// it show json data in good manner

app.use((req, res, next) =>{
	res.header("Access-Control-Allow-origin","*"); // use API from anywhere insted of * we use domain
	res.header("Access-Control-Allow-Headers","Origin, X-requested-With, Content-Type, Accept, Authorization");

	if (req.method === 'OPTIONS') {
		req.header('Access-Control-Allow_Methods','PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

//routes for urls
app.use("/user", userRoutes);
app.use("/packages", packageRoutes);
app.use('/instructions',instructionRoutes);
app.use('/certificates',certificatesRoutes);
app.use('/myaccount',myAccountRoutes);
app.use('/practiseexam',practiceExamRoutes);
app.use('/mainexam',mainExamRoutes);
app.use('/categories',categoriesRoutes);
app.use('/competition',compentionRoutes);




// handle all other request which not found 
app.use((req, res, next) => {
	const error = new Error('Not Found Manual ERROR');
	error.status = 404;
	next(error);
		// when we get 404 error it send to next 
});

// it will handel all error in the application
app.use((error, req, res, next) => {
	// 500 type error is used when we use database
	res.status(error.status || 500);
	res.json({
		error:{
			message:error.message
		}
	})
});

module.exports = app;



