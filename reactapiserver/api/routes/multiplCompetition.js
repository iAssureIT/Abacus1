const mongoose	= require("mongoose");
var moment      = require('moment');
const express 	= require("express");
const router 	= express.Router();
var request = require('request-promise');

router.get('/', (req,res,next)=>{
    var studentId   = req.body.studentId;
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
                if(allCompetitions){
                    console.log('allCompetitions ',allCompetitions);
                    var studentCompetitions = request({
                                                    "method"    :"GET", 
                                                    "url"       : "http://localhost:3042/competitionregisterorder/mainexam/"+studentId,
                                                    "json"      : true,
                                                    "headers"   : {
                                                                    "User-Agent": "My little demo app"
                                                                }
                                                });
                    if(studentCompetitions){
                        console.log('studentCompetitions ',studentCompetitions);
                        for(k = 0 ; k < studentCompetitions.length; k++){
                            var index = allCompetitions.findIndex(data => data._id == studentCompetitions[k].competitionId)
                            if(index > -1){
                                allCompetitions[index].studentPaymentStatus = "paid";
                                var myexamres = request({
                                                            "method"    :"GET", 
                                                            "url"       : 'http://localhost:3042/myexammasters/participation/'+studentCompetitions[k].competitionId+'/'+studentId+'/'+0,
                                                            "json"      : true,
                                                            "headers"   : {
                                                                            "User-Agent": "My little demo app"
                                                                        }
                                                        });
                                if(myexamres){
                                    var myexamresData = myexamres.data;
                                    console.log('myexamresData ',myexamresData);
                                    if(myexamresData.data.length > 0){
                                        if(allCompetitions[index]){
                                            allCompetitions[index].examDataStatus   = myexamresData.data[0].examStatus;
                                            allCompetitions[index].examId           = myexamresData.data[0]._id;
                                        }
                                    }
                                }
                            }
                        }//end of for
                        // console.log('allCompetitions ',allCompetitions);
                        res.status(200).json({allCompetitions});                    
                    }
                }else{
                    res.status(200).json({message:"no data found"});
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
});

module.exports = router;