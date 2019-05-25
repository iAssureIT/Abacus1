const express 	= require("express");
const router 	= express.Router();

const checkAuth	= require('../middleware/check-auth')

const UserController = require('../controllers/user');

router.get('/', UserController.users_list);

router.post('/signup', UserController.user_signup);

router.post('/login',UserController.user_login);

router.delete('/:userId', checkAuth, UserController.user_delete);

router.get('/usrinfo', UserController.user_details);

module.exports = router;