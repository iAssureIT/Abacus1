const express 	= require("express");
const router 	= express.Router();

const StudentRegistrationforCompetitionsController = require('../controllers/studentregistrationforcompetitions');

router.get('/:studentId', StudentRegistrationforCompetitionsController.fetch_competition_student);

module.exports = router;