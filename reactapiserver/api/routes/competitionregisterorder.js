const express 	= require("express");
const router 	= express.Router();
const CompetitionRegisterOrderController         = require('../controllers/competitionregisterorders');

router.get('/mainexam/:studentId',CompetitionRegisterOrderController.fetch_mycompetitionorder_examStatus);
router.get('/:studentId',CompetitionRegisterOrderController.fetch_mycompetitionorder);
router.get('/:studentId/:competitionId',CompetitionRegisterOrderController.fetch_mycompetitionorderreceipt);
router.get('/updateOrder/:studentId/:competitionId/:status/:id/:billNumbers',CompetitionRegisterOrderController.update_mycompetitionorderreceipt);

module.exports = router;