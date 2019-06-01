const express 	= require("express");
const router 	= express.Router();

const PackageOrderController = require('../controllers/packageordermasters');

router.get('/:studentId',PackageOrderController.fetch_mypackageorder);
router.get('/:studentId/:receiptId',PackageOrderController.fetch_mypackageorderreceipt);



module.exports = router;