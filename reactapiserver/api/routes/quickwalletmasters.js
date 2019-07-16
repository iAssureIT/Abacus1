const express 	= require("express");
const router 	= express.Router();

const QuickWalletMastersController = require('../controllers/quickwalletmasters');

router.get('/', QuickWalletMastersController.fetch_details);
router.post('/payment',QuickWalletMastersController.makepayment);
router.post('/exampurchase/:studentId/:competitionId/:compfees',QuickWalletMastersController.paymentGatewayforCompetition);

module.exports = router;
