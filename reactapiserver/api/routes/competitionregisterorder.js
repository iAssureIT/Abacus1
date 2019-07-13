const express 	= require("express");
const router 	= express.Router();
const CompetitionRegisterOrderController         = require('../controllers/competitionregisterorders');

router.get('/:studentId',CompetitionRegisterOrderController.fetch_mycompetitionorder);
router.get('/:studentId/:competitionId',CompetitionRegisterOrderController.fetch_mycompetitionorderreceipt);
router.get('/mainexam/:studentId',CompetitionRegisterOrderController.fetch_mycompetitionorder_examStatus);
module.exports = router;