
const express 	= require("express");
const router 	= express.Router();
const mongoose	= require("mongoose");
var moment      = require('moment');

const StudentMaster                 = require('../models/studentmasters'); 
const ExamMaster                    = require('../models/exammasters');
// const PackageOrderMaster            = require('../models/packageordermasters');
// const PackageManagementMaster       = require('../models/packagemanagementmasters');
// const PackageQuestionPaperMaster    = require('../models/packagequestionpapermasters');
const QuestionPaperMaster           = require('../models/questionpapermasters');

shuffle = function(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;
	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
	}
	return array;
}

router.post('/:compId/:studentID', (req,res,next)=>{
    // res.status(200).json('request');
    console.log('/startexamcategorywise',req.params);
    StudentMaster.findOne({studentId:req.params.studentID})
                 .exec()
                 .then(studentData=>{
                     if(studentData){
                         console.log('studentData ',studentData);
                        ExamMaster  .findOne({_id:req.params.compId,competitionStatus:"start"})
                                    .exec()
                                    .then(examMasterData=>{
                                        if(examMasterData){
                                            console.log('examMasterData ',examMasterData);
                                            var studentCategory = 	examMasterData.competitionExams;
                                            if(studentCategory){
                                                var i = studentCategory.findIndex((data) =>{ return (data.subCategory == studentData.subCategory) });
                                                if(i > -1){
                                                    var categoryWiseExamData =studentCategory[i];
                                                    // if(categoryWiseExamData){
                                                        console.log('categoryWiseExamData ',categoryWiseExamData);
                                                        res.status(200).status(i);        
                                                    // }else{
                                                        // res.status(200).status({message:"student Category not found"});        
                                                    // }
                                                }else{
                                                    res.status(200).status({message:"student Category exam not found"});    
                                                }
                                            }else{
                                                res.status(200).status({message:"student Category exam not found"});
                                            }
                                        }else{
                                            res.status(200).status({message:"Compitition not found"});
                                        }
                                    })
                                    .catch(err =>{
                                        console.log(err);
                                        return res.status(500).json({
                                            error: err
                                        });
                                    });
                     }else{
                        res.status(200).json({message:"Student Not found"});
                     }
                 })
                 .catch(err =>{
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                }); 
});

module.exports = router;
