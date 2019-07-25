const express 	= require("express");
const router 	= express.Router();
const CompetitionRegisterOrderController         = require('../controllers/competitionregisterorders');

router.post('/updateOrder/:studentId/:competitionId/:status/:id/:billNumbers',CompetitionRegisterOrderController.update_mycompetitionorderreceipt);

router.get('/mainexam/:studentId',CompetitionRegisterOrderController.fetch_mycompetitionorder_examStatus);
// router.post('/updateOrder/:studentId/:competitionId/:status/:id/:billNumbers',CompetitionRegisterOrderController.update_mycompetitionorderreceipt);
router.get('/:studentId',CompetitionRegisterOrderController.fetch_mycompetitionorder);
router.get('/:studentId/:competitionId',CompetitionRegisterOrderController.fetch_mycompetitionorderreceipt);
router.get('/getOrder/:studentId/:competitionId',CompetitionRegisterOrderController.fetch_unpaid_mycompetitionorder);

module.exports = router;