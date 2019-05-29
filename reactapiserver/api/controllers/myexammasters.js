const mongoose	= require("mongoose");

const MyExamMaster = require('../models/myexammasters');

exports.fetch_mycertificates = (req,res,next)=>{
    var competitionId = req.body.competitionId;
    var studentId     = req.body.studentId;
    console.log('competitionId ',competitionId);
    console.log('studentId ',studentId);
    MyExamMaster.find({competitionId:competitionId,StudentId:studentId, $and : [{$or : [{rank : "1st"},{rank : "2nd"},{rank:"3rd"},{rank:"Consolation"}]}]})
            .select("fullName rank competitionName examDate")
            .exec()
            .then(instructions =>{
              console.log('instructions ',instructions);
                res.status(200).json(instructions);
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
}

exports.fetch_myparticipationcertificates= (req,res,next)=>{
    var competitionId = req.body.competitionId;
    var studentId     = req.body.studentId;
    MyExamMaster.find({competitionId:competitionId,StudentId:studentId})
            .select("fullName rank competitionName examDate")
            .exec()
            .then(instructions =>{
            //   console.log('packages ',packages);
                res.status(200).json(instructions);
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
}

exports.fetch_myexamreport = (req,res,next)=>{
    var studentId = req.body.studentId;
    MyExamMaster.find({StudentId:studentId,examStatus:"Completed"})
                .sort({competitionName:1,examDate:1,category:1,totalQuestion:1,attemptedQues:1,correctAnswer:1,wrongAnswer:1,examSolvedTime:1,totalScore:1})
                .select("competitionName date category totalQuestion attemptedQues correctAnswer wrongAnswer examSolvedTime totalScore")
                .exec()
                .then(myexamreport =>{
                  console.log('myexamreport ',myexamreport);
                    res.status(200).json(myexamreport);
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
}

exports.fetch_competitionresult = (req,res,next)=>{
    var categoryName    = req.body.categoryName;
    var subCategory     = req.body.subCategory;
    var competitionId   = req.body.competitionId;
    var startRange      = req.body.startRange;
    var dataRange       = req.body.dataRange;
    
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