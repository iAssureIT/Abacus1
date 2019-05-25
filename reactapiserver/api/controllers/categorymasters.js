const mongoose	= require("mongoose");

const Category = require('../models/categorymasters');

exports.fetch_categories = (req,res,next)=>{
    Category.find({})
            .select("categoryName")
		    .exec()
            .then(category =>{
              console.log('category ',category);
              res.status(200).json(category);
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
              error: err
            });
        });
    
}

exports.fetch_categorybyname = (req,res,next)=>{
    Category.find({categoryName:req.params.categoryName})
            // .select("categoryName")
		    .exec()
            .then(category =>{
              console.log('category ',category);
              res.status(200).json(category);
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
              error: err
            });
        });
    
}