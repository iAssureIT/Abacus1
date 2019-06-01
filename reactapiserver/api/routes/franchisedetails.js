const express 	= require("express");
const router 	= express.Router();
const FranchiseDetailsController         = require('../controllers/franchisedetails');

router.get('/:franchiseId', FranchiseDetailsController.fetch_frachiseName);
router.get('/franchisebasicinfo/:companyId', FranchiseDetailsController.fetch_frachiseName_code_contact);


module.exports = router;