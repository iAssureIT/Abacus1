const mongoose	= require("mongoose");
var moment = require('moment');
const ExamMaster = require('../models/exammasters');

exports.latestCompetitions = (req,res,next) => {
    var today           = new Date();
    var i               = 0 ;
    var competitionData = 
        {
            _id               : "",
            competitionName   : "",
            competitionDate   : new Date(),
            startTime         : "",
            endTime           : "",
            competitionFees   : "",
            franchiseShare    : "",
            maatsShare        : 0,
            termsCondition    : "",
            createdAt         : "",
            competitionStatus : "",
            competitionExams  : [ 
                {
                    questionPaperId     : "",
                    category            : "",
                    subCategory         : "",
                    paperTitle          : "",
                    examDuration        : "",
                    totalMarks          : "",
                    marksPerQuestion    : "",
                    examStatus          : ""
                }
            ],
            competitionView         : "",
            examDate                : "",
            EXAMDate                : "",
            examYear                : "",
            examTimeStatus          : "",
            timeStatus              : "",
            nextExamStatus          : "",
            PayDate                 : "",
            currentExamDate         : "",
            examStartStatus         : "",
            studentPaymentStatus    : "",
            examDataStatus          : "",
            examId                  : "",
            lastInCompExamIdStatus  : ""
        };
    var competitionDataVar = [];
    if(today){
        var todayDate       = moment(today).format('L');
        var currentTime     = moment(today).format('LT');
        var ExamStartTime   = moment(currentTime, 'h:mma');
        // var todayTime       = today.getTime();
        ExamMaster  .find({})
                    .exec()
                    .then(data =>{
                        // competitionData = data;
                        if(data){
                            for(i = 0 ; i < data.length ; i++){
                                competitionData = data[i];
                                if(competitionData.competitionName != ""){
                                    const compDate = new Date(competitionData.competitionDate);
                                    competitionData.examDate = moment(competitionData.competitionDate).format('L');
                                    competitionData.EXAMDate = moment(competitionData.examDate).format("DD/MM/YYYY");
                                    var ExamEndTime          = moment(competitionData.endTime, 'h:mma');
                                    if(today.getTime() < compDate.getTime()){
                                        competitionData.examYear = "Accept";
                                    }else{
                                        competitionData.examYear = "NotAccept";
                                    }
                                    if(todayDate>competitionData.examDate){
                                        competitionData.examTimeStatus = "OldExam";
                                    }else if(todayDate<=competitionData.examDate){
                                        competitionData.examTimeStatus = "NewExam";
                                    }
                                    if(todayDate==competitionData.examDate && ExamStartTime>ExamEndTime){
                                        competitionData.timeStatus = "invalid";
                                    }else if(todayDate==competitionData.examDate && ExamStartTime<ExamEndTime){
                                        competitionData.timeStatus = "valid";
                                    }else{
                                        competitionData.timeStatus = "nextCompetition";
                                    }
                                    var studentCategory = competitionData.competitionExams;
                                    if(todayDate<=competitionData.examDate){
                                        competitionData.nextExamStatus = "Present";
                                    }else{
                                        competitionData.nextExamStatus = "Absent";
                                    }
                                    competitionData.PayDate         = moment(competitionData.createdAt).format('MMM Do YYYY');
                                    competitionData.currentExamDate = moment(competitionData.examDate).format("DD/MM/YYYY");
                                    
                                    if(studentCategory){
                                        var index                = studentCategory.findIndex(data => data.subCategory == studentData.subCategory);
                                        var categoryWiseExamData = studentCategory[index];
                                        if(categoryWiseExamData){
                                            competitionData[i].examStartStatus = categoryWiseExamData.examStatus;
                                        }          
                                    }
                                    //Need to continue Ref MultipleCompetition.js
                                }
                            }
                            if(i >= competitionData.length){
                                res.status(200).json(competitionData[1]);
                            }
                        }
                        // res.status(200).json(competitionData[0]);
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                        error: err
                        });
                    });
    }
	
}



