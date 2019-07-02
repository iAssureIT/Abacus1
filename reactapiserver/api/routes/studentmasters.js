const express 	= require("express");
const router 	= express.Router();
const StudentMasterController         = require('../controllers/studentmasters');

router.get('/details/:student_ID',StudentMasterController.fetch_student);
router.get('/getstatus/:studentId',StudentMasterController.fetch_student_status);
router.get('/sinfo/:studentId',StudentMasterController.studentInfo);
router.post('/insertstudent',StudentMasterController.insert_student_registration);
// router.patch('/registration',StudentMasterController.registration);

module.exports = router;

