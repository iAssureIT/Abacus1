const mongoose	= require("mongoose");

const MyExamMaster = require('../models/myexammasters');

exports.fetch_incomplete_exams = (req,res,next) => {
    var studentId       = req.params.studentId;
    MyExamMaster.find({StudentId:studentId,examStatus:"InCompleted"})
            .select("examStatus")
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
exports.fetch_student_incomplete_exams = (req,res,next) => {
    var studentId       = req.params.studentId;
    var competitionId   = req.params.competitionId;
    MyExamMaster.find({StudentId:studentId,competitionId:competitionId,examStatus:"InCompleted"})
            .select("competitionName examDate")
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

exports.search_student_competition_result_view = (req,res,next) =>{
    var categoryName    = req.params.categoryname;
    var studenName     = req.params.studentname;
    var competitionId   = req.params.competitionId;
    console.log('categoryName -> ',categoryName,' studenName -> ',studenName,' competitionId -> ',competitionId);    
    if(categoryName == "all"){
        console.log('category name is all');
        MyExamMaster.find({competitionId:competitionId,fullName:studenName})
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
        console.log('category name is not all');
        MyExamMaster.find({competitionId:competitionId,category:categoryName,fullName:studenName})
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

exports.fetch_exam_student_dashboard = (req,res,next) => {
    console.log('fetch_exam_student_dashboard');
    var studentId     = req.params.studentId;
    MyExamMaster.find({StudentId:studentId})
            .select("competitionName category totalScore")
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

exports.update_myexammaster = (req,res,next) =>{
    MyExamMaster.update(
                            {_id : req.params.ID},
                            {
                                $set:{
                                    "examStatus":"Completed",
                                }
                            }
                        )
                .exec()
                .then(data =>{
                    if(data.nModified == 1){
                        res.status(200).json({message: "Exam Completed"});
                    }else{
                        res.status(200).json({message: "Something Went Wrong"});
                    }
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
}