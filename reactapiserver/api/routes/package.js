const express 	= require("express");
const router 	= express.Router();

const PackageController = require('../controllers/package');

router.get('/p', PackageController.list_packages);

module.exports = router;