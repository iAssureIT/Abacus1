const express 	= require("express");
const router 	= express.Router();
const ExamMastersController         = require('../controllers/exammasters');

router.get('/', ExamMastersController.fetch_all);
router.get('/listmainexam',ExamMastersController.fetch_exam_details_mainexam);

router.get('/list', ExamMastersController.fetch_exam_details);
router.get('/exampurchase/:competitionId/:studentId',ExamMastersController.competitionDetails);
router.get('/:competitionId', ExamMastersController.fetch_statu_exam);

module.exports = router;