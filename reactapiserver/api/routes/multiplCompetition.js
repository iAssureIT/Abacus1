const mongoose	= require("mongoose");
var moment      = require('moment');
const express 	= require("express");
const router 	= express.Router();
var request = require('request-promise');

router.get('/', (req,res,next)=>{
    
    // var studentId   = req.body.studentId;
    var todayDate   = req.body.todaydate;
    var subCategory = req.body.subCategory;
    request({
                "method"    : "GET", 
                "url"       : "http://localhost:3042/exammasters/listmainexam",
                "body"      : {todaydate : todayDate ,subCategory : subCategory},
                "json"      : true,
                "headers"   : {
                                "User-Agent": "My little demo app"
                            }
            })
            .then(allCompetitions=>{
                res.header("Access-Control-Allow-Origin","*");
                res.status(200).json(allCompetitions);
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
});

module.exports = router;