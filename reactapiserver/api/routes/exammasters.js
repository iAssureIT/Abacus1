const express 	= require("express");
const router 	= express.Router();
const ExamMastersController         = require('../controllers/exammasters');

router.get('/', ExamMastersController.fetch_all);
router.get('/list', ExamMastersController.fetch_exam_details);
router.get('/listmainexam',ExamMastersController.fetch_all_show_exam);
router.get('/:competitionId', ExamMastersController.fetch_statu_exam);

module.exports = router;