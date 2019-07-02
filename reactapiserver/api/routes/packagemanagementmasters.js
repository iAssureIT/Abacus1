const express 	= require("express"); 
const router 	= express.Router();

const PackageManagementMastersController = require('../controllers/packagemanagementmasters');

router.get('/:packageID', PackageManagementMastersController.fetch_package);
router.get('/', PackageManagementMastersController.findall_packages);



module.exports = router;
