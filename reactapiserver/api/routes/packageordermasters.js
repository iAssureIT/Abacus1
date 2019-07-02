const express 	= require("express");
const router 	= express.Router();

const PackageOrderController = require('../controllers/packageordermasters');

router.get('/invoice/:invoice_ID',PackageOrderController.invoice_display);
router.get('/updatepackage/:ID/:packageId',PackageOrderController.find_packagID)
router.get('/:studentId',PackageOrderController.fetch_mypackageorder);
router.get('/:studentId/:receiptId',PackageOrderController.fetch_mypackageorderreceipt);
router.get('/:ID',PackageOrderController.check_packageorder);
router.patch('/updatepackageid/:ID/:packageId',PackageOrderController.update_packageID);
router.post('/',PackageOrderController.insert_packageorder);


module.exports = router;