const express 	= require("express");
const router 	= express.Router();
const MyExamMastersController         = require('../controllers/myexammasters');

router.get('/dashboard/:studentId',MyExamMastersController.fetch_exam_student_dashboard);
router.get('/:competitionId/:studentId', MyExamMastersController.fetch_mainexam_certificate);
router.get('/participation/:competitionId/:studentId', MyExamMastersController.fetch_participationexam_certificate);
router.get('/:studentId',MyExamMastersController.fetch_mainexam_student);
router.get('/:categoryname/:subCategory/:competitionId/:startRange/:dataRange',MyExamMastersController.fetch_competition_result_view);
router.get('/:categoryname/:studentname/:competitionId',MyExamMastersController.search_student_competition_result_view);
// 
// router.get('/dashboard/:studentId',(req,res,next) => {
//     console.log('fetch_exam_student_dashboard');
//     // var studentId     = req.params.studentId;
//     // MyExamMaster.find({StudentId:studentId})
//     //         .select("competitionName category totalScore")
//     //         .exec()
//     //         .then(data =>{
//     //         //   console.log('data ',data);
//     //             res.status(200).json(data);
//     //         })
//     //         .catch(err =>{
//     //             console.log(err);
//     //             res.status(500).json({
//     //                 error: err
//     //             });
//     //         });
// });


module.exports = router;