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

exports.fetch_subcategories_according_age = (req,res,next) => {
  var categoryName = req.params.categoryname;
  var age          = req.params.age;
  CategoryMaster.findOne({categoryName:categoryName})
            .select("categoryName levels")
            .exec()
            .then(data =>{
              if(age<=7){
                res.status(200).json(data.categoryName+'1');
              }else if(age>7 && age<=9){
                res.status(200).json(data.categoryName+'2');
              }else if(age>9 && age<=11){
                res.status(200).json(data.categoryName+'3');
              }else if(age>11){
                res.status(200).json(data.categoryName+'4');
              }
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
}
