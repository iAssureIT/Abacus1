const express 	= require("express");
const router 	= express.Router();
const ExamMastersController         = require('../controllers/exammasters');
const MainExamReportController      = require('../controllers/myexammasters');
const StudentController             = require('../controllers/studentmasters');

router.get('/', ExamMastersController.fetch_all);
router.get('/allexamreport', MainExamReportController.fetch_myexamreport);
router.get('/competitionresult',MainExamReportController.fetch_competitionresult);
router.get('/getFranchiseName',StudentController.getFranchiseName);

module.exports = router;