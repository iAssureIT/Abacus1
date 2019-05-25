const mongoose	= require("mongoose");

const Package = require('../models/packagemanagementmasters');

exports.create_package = (req,res,next) => {
    console.log('create package');
    const package = new Package({
        _id: new mongoose.Types.ObjectId(),
        packageName: req.body.packageName,
        categoryName: req.body.categoryName,
        subCategory: req.body.subCategory
    });
    console.log('package ',package);
    package.save()
    .then(result => {
      console.log("package insert result ",result);
      res.status(201).json({
        message: "Created pacakge successfully",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

}

exports.list_packages = (req,res,next)=>{
    Package.find()
            .select("packageName categoryName subCategory NoOfPracticeTest AttemptOfPracticeTest PackagePrice Description")
		        .exec()
            .then(packages =>{
              console.log('packages ',packages);
              res.status(200).json(packages);
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
              error: err
            });
        });
    
}