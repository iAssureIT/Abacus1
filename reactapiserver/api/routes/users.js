const express 	= require("express");
const router 	= express.Router();

const checkAuth     = require('../middlerware/check-auth');

const UserController = require('../controllers/user');

router.get('/', UserController.users_list);

router.get('/profileimg/:studentId', UserController.user_profileimg);

router.get('/:studentId',UserController.user_details);

router.post('/signup', UserController.user_signup);

router.post('/login',UserController.user_login);

router.post('/changepwd',UserController.change_pwd);

router.post('/changepwdall',UserController.change_all_student_pwd);

router.get('/fetchopt',UserController.fetch_otp);

router.post('/updateotp',UserController.update_otp);

router.post('/mobileverification',UserController.mobile_optverify);

router.post('/emailverification',UserController.email_optverify);

router.post('/updateotp',UserController.update_otp);

router.post('/forgotpwd',UserController.sendEmail_setOTP);

router.post('/forgotpwd/mobile',UserController.sendMobile_setOTP);

router.post('/checkotp',UserController.check_otp);

router.post('/resendotp',UserController.resend_otp);

router.delete('/:userId', checkAuth, UserController.user_delete);


module.exports = router;