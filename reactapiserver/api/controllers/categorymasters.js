const mongoose	= require("mongoose");

const CategoryMaster = require('../models/categorymasters');

exports.fetch_categoriesName = (req,res,next)=>{
    CategoryMaster.find({})
            .select("categoryName")
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

exports.fetch_categorydetails = (req,res,next)=>{
    var categoryName = req.params.categoryname;
    CategoryMaster.findOne({categoryName:categoryName})
            .select("categoryName categoryMarks levels")
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
