const express 	= require("express");
const router 	= express.Router();

const PackageOrderController = require('../controllers/packageordermasters');

router.get('/check/:ID',PackageOrderController.check_packageorder);
router.get('/fetchTotal/:ID',PackageOrderController.fetch_package_Total);
router.get('/invoice/:invoice_ID',PackageOrderController.invoice_display);
router.get('/updatepackage/:ID/:packageId',PackageOrderController.find_packagID)
router.get('/:studentId',PackageOrderController.fetch_mypackageorder);
router.get('/:studentId/:receiptId',PackageOrderController.fetch_mypackageorderreceipt);
router.post('/updatepackageid/:ID/:packageId',PackageOrderController.update_packageID);
router.post('/',PackageOrderController.insert_packageorder);
router.post('/createorder/:student_ID/:Order_ID/:package_ID',PackageOrderController.create_order);
router.post('/updatePackageOrder/:studentId/:orderId/:status/:id/:billNumbers/:totalAmount',PackageOrderController.update_packageorderreceipt);

module.exports = router;