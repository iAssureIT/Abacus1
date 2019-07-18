const express 	= require("express");
const router 	= express.Router();

const ProjectSettingsController = require('../controllers/projectsettings');

router.get('/',ProjectSettingsController.fetch_projectsettings);

module.exports = router;