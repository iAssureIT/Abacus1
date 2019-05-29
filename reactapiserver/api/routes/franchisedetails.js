const express 	= require("express");
const router 	= express.Router();
const FranchiseDetailsController         = require('../controllers/franchisedetails');

router.get('/:franchiseId', FranchiseDetailsController.fetch_frachiseName);

module.exports = router;