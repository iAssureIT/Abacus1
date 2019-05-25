const express 	= require("express");
const router 	= express.Router();

const PracticeExamReportController = require('../controllers/mypracticeexammasters');

router.get('/allexamreport', PracticeExamReportController.fetch_mypracticeexamreport);
router.get('/getPracticeExamTimeData', PracticeExamReportController.getPracticeExamTimeData);
router.get('/getLastVisitedQuestion', PracticeExamReportController.getLastVisitedQuestion);
router.get('/getExamQuestions', PracticeExamReportController.getExamQuestions);




module.exports = router;