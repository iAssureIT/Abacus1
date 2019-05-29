const express 	= require("express");
const router 	= express.Router();
const CategoryMastersController         = require('../controllers/categorymasters');

router.get('/categoriesname', CategoryMastersController.fetch_categoriesName);
router.get('/:categoryname', CategoryMastersController.fetch_categorydetails);

module.exports = router;