const mongoose	= require("mongoose");

const MyExamMaster = require('../models/myexammasters');


exports.fetch_mainexam_certificate = (req,res,next)=>{
    var competitionId = req.params.competitionId;
    var studentId     = req.params.studentId;
    MyExamMaster.find({competitionId:competitionId,StudentId:studentId, $and : [{$or : [{rank : "1st"},{rank : "2nd"},{rank:"3rd"},{rank:"Consolation"}]}]})
            .select("fullName rank competitionName examDate")
            .exec()
            .then(data =>{
            //   console.log('data ',data);
                res.status(200).json(data);
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
}

exports.fetch_participationexam_certificate = (req,res,next) => {
    var competitionId = req.params.competitionId;
    var studentId     = req.params.studentId;
    MyExamMaster.find({competitionId:competitionId,StudentId:studentId})
            .select("fullName competitionName examDate")
            .exec()
            .then(data =>{
            //   console.log('data ',data);
                res.status(200).json(data);
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
}

exports.fetch_mainexam_student = (req,res,next) => {
    var studentId     = req.params.studentId;
    MyExamMaster.find({StudentId:studentId,examStatus:"Completed"})
            .select("competitionName examDate category totalQuestion attemptedQues correctAnswer wrongAnswer examSolvedTime totalScore")
            .exec()
            .then(data =>{
            //   console.log('data ',data);
                res.status(200).json(data);
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
}

///exammasters/:categoryname/:subCategory/:competitionId/:startRange/:dataRange
exports.fetch_competition_result_view = (req,res,next) =>{
    var categoryName    = req.params.categoryname;
    var subCategory     = req.params.subCategory;
    var competitionId   = req.params.competitionId;
    var startRange      = parseInt(req.params.startRange);
    var dataRange       = parseInt(req.params.dataRange);
    
    if(categoryName == "all"){
        MyExamMaster.find({competitionId:competitionId})
                    .sort({totalScore:-1,examSolvedTime:1})
                    .skip(startRange)
                    .limit(dataRange)
                    .select("totalMarks StudentId attemptedQues competitionName firstName lastName totalQuestion totalScore examSolvedTime status rank category subCategory studImg")
                    .exec()
                    .then(competition =>{
                        res.status(200).json(competition);
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
    }else{
        if(subCategory == "all"){
            MyExamMaster.find({competitionId:competitionId,category:categoryName})
                        .sort({totalScore:-1,examSolvedTime:1})
                        .skip(startRange)
                        .limit(dataRange)
                        .select("totalMarks StudentId attemptedQues competitionName firstName lastName totalQuestion totalScore examSolvedTime status rank category subCategory studImg")
                        .exec()
                        .then(competition =>{
                            res.status(200).json(competition);
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
        }else{
            MyExamMaster.find({competitionId:competitionId,category:categoryName,subCategory:subCategory})
                        .sort({totalScore:-1,examSolvedTime:1})
                        .skip(startRange)
                        .limit(dataRange)
                        .select("totalMarks StudentId attemptedQues competitionName firstName lastName totalQuestion totalScore examSolvedTime status rank category subCategory studImg")
                        .exec()
                        .then(competition =>{
                            res.status(200).json(competition);
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
        }
    }
}