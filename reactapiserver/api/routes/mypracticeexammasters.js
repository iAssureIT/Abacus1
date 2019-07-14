const express 	= require("express");
const router 	= express.Router();
const MyPracticeExamMastersController         = require('../controllers/mypracticeexammasters');

router.get('/getresult/:examId',MyPracticeExamMastersController.ExamMarksUpdate);
router.get('/incompleteexam/:studentId',MyPracticeExamMastersController.fetch_incomplete_student);
router.get('/:studentId', MyPracticeExamMastersController.fetch_practice_student);
router.get('/:examPaperId/:studentId', MyPracticeExamMastersController.fetch_exampaper_student);
router.get('/practiceExam/:practiceExamId/:studentId',MyPracticeExamMastersController.fetch_practice_exam_student);
router.get('/practiceExam/:practiceExamId',MyPracticeExamMastersController.fetch_practice);
router.post('/',MyPracticeExamMastersController.update_exam_ans);


module.exports = router;