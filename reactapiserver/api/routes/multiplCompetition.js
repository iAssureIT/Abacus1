const mongoose	= require("mongoose");
var moment      = require('moment');
const express 	= require("express");
const router 	= express.Router();
var request = require('request-promise');

router.post('/', (req,res,next)=>{
    var studentId   = req.body.studentId;
    var todayDate   = req.body.todaydate;

    var examMaster = request({
                                "method":"GET", 
                                "uri": "https://api.github.com/",
                                "json": true,
                                "headers": {
                                "User-Agent": "My little demo app"
                                }
                            }).then(console.log, console.log);
   

});

module.exports = router;