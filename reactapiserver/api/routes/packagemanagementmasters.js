const express 	= require("express"); 
const router 	= express.Router();

const PackageManagementMastersController = require('../controllers/packagemanagementmasters');

router.get('/attemptOfpracticetest/:packageID', PackageManagementMastersController.fetch_package_AttemptOfPracticeTest);

router.get('/:packageID', PackageManagementMastersController.fetch_package);

router.get('/', PackageManagementMastersController.findall_packages);



module.exports = router;
