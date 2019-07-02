const express 	= require("express");
const router 	= express.Router();


const LatestCompetitionsController = require('../controllers/latestCompetitions');

router.get('/', LatestCompetitionsController.latestCompetitions);

module.exports = router;
