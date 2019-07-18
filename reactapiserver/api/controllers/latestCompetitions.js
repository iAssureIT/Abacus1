const mongoose	= require("mongoose");
var moment = require('moment');
const ExamMaster                = require('../models/exammasters');
const CompetitionRegisterOrder  = require('../controllers/competitionregisterorders');
const StudentMasters            = require('../controllers/studentmasters');

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
        ExamMaster  .find({})
                    .exec()
                    .then(data =>{
                        if(data){
                            var studentID = {
                                params : {
                                    student_ID : req.params.student_ID
                                }
                            };
                            var studentData = StudentMasters.fetch_student(studentID,res,next);
                            if(i >= data.length){
                                res.status(200).json(competitionData[1]);
                            }else{
                                res.status(200).json("Something went wrong");
                            }
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                        error: err
                        });
                    });
    }
	
}



