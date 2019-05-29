const express 	= require("express");
const router 	= express.Router();
const MyPracticeExamMastersController         = require('../controllers/mypracticeexammasters');

router.get('/:studentId', MyPracticeExamMastersController.fetch_practice_student);

module.exports = router;