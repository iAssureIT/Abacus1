var nodemailer = require('nodemailer');
const express 	= require("express");
const router 	= express.Router();

router.post('/', (req,res,next) => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port : 587,
        secure: true,
        auth: {
            user: 'support@maats.in',
            pass: 'maats@maats777'
        }
    });
    // console.log('trasporter ',transporter);
    var mailOptions = {
        from: 'support@maats.in',
        to: 'anagha.sinless@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    console.log('mailOptions ',mailOptions);
    if(mailOptions){
        transporter.sendMail(mailOptions, function(error, info){
            console.log('sendemail');
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }
});

module.exports = router;

