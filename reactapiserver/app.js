const express = require ('express');
const app = express();
const morgan = require('morgan');// morgan call next function if problem occure
const bodyParser = require('body-parser');// this package use to formate json data 
const mongoose = require ('mongoose');

// Routes which should handle requests
const userRoutes 					= require('./api/routes/users');
const exammasterRouter 				= require('./api/routes/exammasters');
const myexammasterRouter			= require('./api/routes/myexammasters');
const mypracticeexammastersRouter	= require('./api/routes/mypracticeexammasters');
const categoresmasterRouter			= require('./api/routes/categorymasters');
const franchisedetailsRouter 		= require('./api/routes/franchisedetails');
const competitionregisterorderRouter= require('./api/routes/competitionregisterorder');
const packageordermastersRouter		= require('./api/routes/packageordermasters');
const instructionRoutes 			= require('./api/routes/instructionmasters'); 
const studentMasterRoutes			= require('./api/routes/studentmasters');
const tempImgRouters				= require('./api/routes/tempimages');
const notificationmastersRoutes		= require('./api/routes/notificationmasters');
const packagequestionpapermasterRoutes	= require('./api/routes/packagequestionpapermaster');
const packagemanagementmastersRoutes = require('./api/routes/packagemanagementmasters');
const quickwalletmastersRoutes		= require('./api/routes/quickwalletmasters');

const registrationRouters			= require('./api/routes/registration');
const purchasedpackageRouters		= require('./api/routes/purchasedpackage');
const dashboardRouters				= require('./api/routes/dashboard');
const sturegcompetitionsRouters		= require('./api/routes/studentregistrationforcompetitions');
const questionpapermastersRouters	= require('./api/routes/questionpapermasters');
const latestCompetitionsRouters		= require('./api/routes/latestCompetitions');
const startexamcategorywiseRouters	= require('./api/routes/startexamcategorywise');

mongoose.connect('mongodb://localhost/onlineExamSystem3may19',{
// mongoose.connect('mongodb://localhost/onlineExamSystem',{
	useNewUrlParser: true
})
mongoose.promise =global.Promise;

// process.env.MANGO_ATLAS_PW envirnmaent variable name
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));// urlencode true and false simple-body url data
app.use(bodyParser.json());// it show json data in good manner

app.use((req, res, next) =>{
	res.header("Access-Control-Allow-origin", "*"); // use API from anywhere insted of * we use domain
	res.header("Access-Control-Allow-Headers" , "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	// req.header("Access-Control-Allow-Methods" , "PATCH, PUT, POST, DELETE, GET, OPTIONS");
	// res.writeHead(200, headers);
	if (req.method === 'OPTIONS') {
		console.log('options');
		// res.header("Access-Control-Allow-Headers" , "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		req.header("Access-Control-Allow-Methods" , "PATCH, PUT, POST, DELETE, GET, OPTIONS");
		return res.status(200).json({});
	}
		console.log('no options');
	next();
});

// app.use((req, res, next) =>{
// 	 var headers = {};

// 	// set header to handle the CORS
// 	headers['Access-Control-Allow-Origin'] = '*';
// 	headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With cache-control';
// 	headers['Access-Contrl-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS';
// 	headers["Access-Control-Max-Age"] = '86400';
// 	if(headers.Access-Control-Max-Age){

// 		res.writeHead(200, headers);
// 	}

//     // res.header("Access-Control-Allow-origin","*"); // use API from anywhere insted of * we use domain
//     // res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");

//     if (req.method === 'OPTIONS') {
//     	console.log('options')
//         // req.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
//         // return res.status(200).json({});
//         res.end();
//     }
//     next();
// });

//URL's collection wise
app.use("/user", userRoutes);
app.use("/exammasters", exammasterRouter);
app.use("/myexammasters",myexammasterRouter);
app.use("/mypracticeexammasters",mypracticeexammastersRouter);
app.use("/categories",categoresmasterRouter);
app.use("/franchisedetails",franchisedetailsRouter);
app.use("/competitionregisterorder",competitionregisterorderRouter);
app.use("/packageordermasters",packageordermastersRouter);
app.use('/instructions',instructionRoutes);
app.use('/studentmaster',studentMasterRoutes);
app.use('/tempimg',tempImgRouters);
app.use('/notificationmasters',notificationmastersRoutes)
app.use('/questionpapermasters',questionpapermastersRouters);
app.use("/packagemanagementmasters",packagemanagementmastersRoutes);
app.use("/quickwalletmasters",quickwalletmastersRoutes);

app.use("/registration",registrationRouters);
app.use("/purchasedpackage",purchasedpackageRouters);
app.use('/dashaboard',dashboardRouters);
app.use('/studentcompetitions',sturegcompetitionsRouters);
app.use("/packagequestionpapermaster",packagequestionpapermasterRoutes);
app.use("/latestcompetitions",latestCompetitionsRouters);
app.use("/startexamcategorywise",startexamcategorywiseRouters);

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



