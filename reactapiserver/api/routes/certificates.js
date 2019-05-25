const express 	= require("express");
const router 	= express.Router();

const ExamMastersController = require('../controllers/exammasters');
const MyExamMastersController = require('../controllers/myexammasters');

router.get('/', ExamMastersController.fetch_all);
router.get('/mycertificates', MyExamMastersController.fetch_mycertificates);
router.get('/myparticipationcertificates', MyExamMastersController.fetch_myparticipationcertificates);


module.exports = router;
