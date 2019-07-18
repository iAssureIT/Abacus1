const express 	= require("express");
const router 	= express.Router();

const LatestCompetitionsController = require('../controllers/latestCompetitions');

router.get('/:student_ID', LatestCompetitionsController.latestCompetitions);

module.exports = router;
