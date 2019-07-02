const mongoose	= require("mongoose");

const PackageManagementMasters = require('../models/packagemanagementmasters');

exports.findall_packages = (req, res, next)=>{
    PackageManagementMasters.find({})
                            .sort({createdAt: -1})
                            .select("packageName categoryName subCategory NoOfPracticeTest AttemptOfPracticeTest PackagePrice Description")
                            .exec()
                            .then(data=>{
                                // console.log('packagemanagementmasters ',data);
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
    PackageManagementMasters.findOne({_id:req.params.packageID})
                            .exec()
                            .then(data=>{
                                console.log('packagemanagementmasters ',data);
                                res.status(200).json(data);
                            })
                            .catch(err=>{
                                console.log('err ',err);
                                res.status(500).json({
                                    error: err
                                });
                            });
}