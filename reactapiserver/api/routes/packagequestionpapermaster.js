const express 	= require("express");
const router 	= express.Router();

const PackageQuestionPaperMaster = require('../controllers/packagequestionpapermaster');

router.patch('/',PackageQuestionPaperMaster.update_packagequestionpapermaster);



module.exports = router;