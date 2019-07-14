const express 	= require("express");
const router 	= express.Router();

const PackageQuestionPaperMaster = require('../controllers/packagequestionpapermaster');

router.post('/',PackageQuestionPaperMaster.update_packagequestionpapermaster);

router.get('/:studentID',PackageQuestionPaperMaster.fetch_student_pkgquemaster);



module.exports = router;