const express 	= require("express");
const router 	= express.Router();

const TempImagesController = require('../controllers/tempimages');

router.get('/:studentId',TempImagesController.fetch_tempimg);
router.post('/',TempImagesController.insert_img);


module.exports = router;