const express 	= require("express");
const router 	= express.Router();

const PackageController = require('../controllers/packagemanagementmasters');

router.get('/', PackageController.list_packages);
// router.post('/newpackage', PackageController.create_package);


module.exports = router;