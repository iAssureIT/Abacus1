const express 	= require("express");
const router 	= express.Router();

const DashboardController = require('../controllers/dashboard');

router.get('/:studentID', DashboardController.purchased_packaged);

module.exports = router;