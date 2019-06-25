const mongoose	= require("mongoose");
var moment      = require('moment');

const ExamMaster                = require('../models/exammasters');
const StudentData               = require('../models/studentmasters');
const CompetitionRegisterOrder  = require('../models/competitionregisterorders');
const MyExamMaster              = require('../models/myexammasters');

exports.fetch_competition_student = (req,res,next)=>{
    StudentData.findOne({studentId:req.params.studentId})
                .exec()
                .then(studentd=>{
                    studentData1 = studentd;
                    ExamMaster  .find({competitionView:"Show"})
                                .sort({"competitionDate":-1})
                                .exec()
                                .then(compData =>{
                                    res.status(200).json(data);
                                })
                                .catch(err =>{
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    });
                                });
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
}

