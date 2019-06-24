const express 	= require("express");
const router 	= express.Router();
const MyExamMastersController         = require('../controllers/myexammasters');

router.get('/:competitionId/:studentId', MyExamMastersController.fetch_mainexam_certificate);
router.get('/participation/:competitionId/:studentId', MyExamMastersController.fetch_participationexam_certificate);
router.get('/:studentId',MyExamMastersController.fetch_mainexam_student);
router.get('/:categoryname/:subCategory/:competitionId/:startRange/:dataRange',MyExamMastersController.fetch_competition_result_view);
router.get('/:categoryname/:studentname/:competitionId',MyExamMastersController.search_student_competition_result_view);
router.get('/dashboard/:studentId',MyExamMastersController.fetch_exam_student_dashboard);

module.exports = router;