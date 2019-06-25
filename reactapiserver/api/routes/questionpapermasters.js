const express 	= require("express");
const router 	= express.Router();

const QuestionPaperMastersController = require('../controllers/questionpapermasters');

router.get('/:category/:subcategory', QuestionPaperMastersController.fetch_quespapers);

module.exports = router;