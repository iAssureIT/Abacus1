const express 	= require("express");
const router 	= express.Router();

const checkAuth     = require('../middlerware/check-auth');

const UserController = require('../controllers/user');

router.get('/', UserController.users_list);

router.post('/signup', UserController.user_signup);

router.post('/login',UserController.user_login);

router.delete('/:userId', checkAuth, UserController.user_delete);

router.get('/profileimg/:studentId', UserController.user_profileimg);

router.get('/:studentId',UserController.user_details);

// router.patch('/registration',UserController.registration);


module.exports = router;