const express 	= require("express");
const router 	= express.Router();

const NotificationMastersController         = require('../controllers/notificationmasters');

router.get('/:status', NotificationMastersController.fetch_notificationmasters);



module.exports = router;