const mongoose	= require("mongoose");

const QuestionPaperMasters = require('../models/questionpapermasters');

exports.fetch_quespapers = (req,res,next)=>{
    var category = req.params.category;
    var subCategory = req.params.subcategory;
    QuestionPaperMasters.find({category:category, subCategory:subCategory, examType : "Practice Exam",isDraft:"",paperStatus : "Assigned"})
                        .select("quePaperTitle")
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

