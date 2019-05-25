const express 	= require("express");
const router 	= express.Router();

const CategoryController    = require('../controllers/categorymasters');

router.get('/',CategoryController.fetch_categories);
router.get('/:categoryName',CategoryController.fetch_categorybyname);



module.exports = router;