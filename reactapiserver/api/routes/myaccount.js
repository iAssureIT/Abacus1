const express 	= require("express");
const router 	= express.Router();

const UserController = require('../controllers/user');
const StudentController = require('../controllers/studentmasters');
const CompetitionOrderController = require('../controllers/competitionregisterorder');
const PackageOrderController = require('../controllers/packageordermasters');



router.get('/usrinfo', UserController.user_details);
router.get('/studentinfo',StudentController.studentInfo);
router.get('/competitionorder',CompetitionOrderController.fetch_mycompetitionorder);
router.get('/competitionorderreceipt',CompetitionOrderController.fetch_mycompetitionorderreceipt);
router.get('/packageorder',PackageOrderController.fetch_mypackageorder);
router.get('/packageorderreceipt',PackageOrderController.fetch_mypackageorderreceipt);



module.exports = router;