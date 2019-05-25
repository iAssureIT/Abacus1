const express 	= require("express");
const router 	= express.Router();

const InstructionController = require('../controllers/instructionmasters');

router.get('/', InstructionController.fetch_instructions);

module.exports = router;
