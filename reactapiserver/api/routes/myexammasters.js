const express 	= require("express");
const router 	= express.Router();
const MyExamMastersController         = require('../controllers/myexammasters');

router.get('/',MyExamMastersController.fetch_all_show_exam);

router.get('/dashboard/:studentId',MyExamMastersController.fetch_exam_student_dashboard);

router.get('/getalreadysolvedquesans/:examId/:index',MyExamMastersController.getAlreadySolvedQuesAns);

router.get('/getmainexamlastvisitedquestion/:competitionId',MyExamMastersController.getmainexamlastvisitedquestion);

router.get('/getmainexamquestions/:competitionId/:studentId',MyExamMastersController.getMainExamQuestions);

router.get('/participation/:competitionId/:studentId', MyExamMastersController.fetch_participationexam_certificate);

router.get('/dashboard/:studentId/:competitionId',MyExamMastersController.fetch_student_incomplete_exams);

router.get('/incomplete/:studentId',MyExamMastersController.fetch_incomplete_exams);

router.get('/completeexam/:ID',MyExamMastersController.update_myexammaster);

router.get('/:competitionId/:studentId', MyExamMastersController.fetch_mainexam_certificate);

router.get('/:studentId',MyExamMastersController.fetch_mainexam_student);

router.get('/:categoryname/:subCategory/:competitionId/:startRange/:dataRange',MyExamMastersController.fetch_competition_result_view);

router.get('/:categoryname/:studentname/:competitionId',MyExamMastersController.search_student_competition_result_view);

router.patch('/updateexamtimeAndstudenanswer',MyExamMastersController.updateExamTimeAndStudenAnswer);


module.exports = router;