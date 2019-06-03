const express 	= require("express");
const router 	= express.Router();
const StudentMasterController         = require('../controllers/studentmasters');

router.get('/getstatus/:studentId',StudentMasterController.fetch_student_status);
router.get('/:studentId',StudentMasterController.studentInfo);
router.post('/insertstudent',StudentMasterController.insert_student_registration);
// router.patch('/registration',StudentMasterController.registration);

module.exports = router;