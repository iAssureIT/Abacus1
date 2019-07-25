const mongoose	= require("mongoose"); 

const PackageManagementMasters = require('../models/packagemanagementmasters');

exports.findall_packages = (req, res, next)=>{
    PackageManagementMasters.find({})
                            .sort({createdAt: -1})
                            .select("packageName categoryName subCategory NoOfPracticeTest AttemptOfPracticeTest PackagePrice Description")
                            .exec()
                            .then(data=>{
                                res.status(200).json(data);
                            })
                            .catch(err=>{
                                console.log('err ',err);
                                res.status(500).json({
                                    error: err
                                });
                            });
}

exports.fetch_package = (req,res,next)=>{
    console.log("fetch_package",req.params.packageID);
    PackageManagementMasters.findOne({_id:req.params.packageID})
                            .exec()
                            .then(data=>{
                                res.status(200).json(data);
                            })
                            .catch(err=>{
                                console.log('err ',err);
                                res.status(500).json({
                                    error: err
                                });
                            });
}

exports.fetch_package_AttemptOfPracticeTest = (req,res,next)=>{
    PackageManagementMasters.findOne({_id:req.params.packageID})
                            .select("AttemptOfPracticeTest")
                            .exec()
                            .then(data=>{
                                res.status(200).json(data);
                            })
                            .catch(err=>{
                                console.log('err ',err);
                                res.status(500).json({
                                    error: err
                                });
                            });
}