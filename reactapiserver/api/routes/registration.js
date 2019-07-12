
/*Need to work */
const mongoose = require("mongoose");
const express 	= require("express");
const router 	= express.Router();


const TempImages        = require('../models/tempimages');
const StudentMaster     = require('../models/studentmasters'); 
const FranchiseDetails  = require('../models/franchisedetails');
const User              = require('../models/users');
const CategoryMasters   = require('../models/categorymasters');

router.post('/', (req,res,next) => {
    var data = req.body;
    console.log('data ',data);
    FranchiseDetails.findOne({"companyId":parseInt(req.body.companyId)})
                    .exec()
                    .then(franchiseData=>{
                        if(franchiseData){
                            User.updateOne(
                                            {"_id":req.body.studUserId},
                                            {
                                                $set:{
                                                    "profile.firstname"     : req.body.studentFirstName,
                                                    "profile.lastname"      : req.body.studentLastName,
                                                    "profile.fullName"      : req.body.studentFirstName+' '+req.body.studentLastName,
                                                    "profile.mobNumber"     : req.body.mobileNumber,
                                                    "profile.franchiseName" : req.body.franchiseName,
                                                    "profile.franchise_id"  : franchiseData.franchiseCodeForCompanyId,
                                                } 
                                            }
                                        )
                                .exec()
                                .then(user=>{
                                    if(user){
                                        CategoryMasters .findOne({"categoryName":req.body.category})
                                                        .exec()
                                                        .then(categoryData=>{
                                                            var subCategory = categoryData.categoryName;
                                                            if(req.body.age<=7){
                                                                var subCategory = subCategory+'1';
                                                            }else if(req.body.age>7 && req.body.age<=9){
                                                                var subCategory = subCategory+'2';
                                                            }else if(req.body.age>9 && req.body.age<=11){
                                                                var subCategory = subCategory+'3';
                                                            }else if(req.body.age>11){
                                                                var subCategory = subCategory+'4';
                                                            }
                                                            console.log('subcategory ',subCategory);
                                                            if(req.body._id){
                                                                StudentMaster   .updateOne(
                                                                                        {"_id":req.body._id},
                                                                                        {
                                                                                            $set:{
                                                                                                'studentFirstName'  		: req.body.studentFirstName,
                                                                                                'studentMiddleName' 		: req.body.studentMiddleName,
                                                                                                'studentLastName'   		: req.body.studentLastName,
                                                                                                'studentFullName'   		: req.body.studentFirstName+' '+req.body.studentMiddleName+ ' '+req.body.studentLastName,
                                                                                                'mobileNumber'   			: req.body.mobileNumber,
                                                                                                'studentDOB'     			: req.body.studentDOB,
                                                                                                'studentAge'     			: req.body.age,
                                                                                                'schoolName'     			: req.body.schoolName,
                                                                                                'franchiseName'  			: req.body.franchiseName,
                                                                                                'companyId'    				: parseInt(req.body.companyId),
                                                                                                'franchiseId'               : franchiseData.franchiseCodeForCompanyId,
                                                                                                'franchiseMobileNumber' 	: req.body.franchiseMobileNumber,
                                                                                                'studentAddress' 			: req.body.studentAddress,
                                                                                                'studentCountry' 			: req.body.studentCountry,
                                                                                                'studentState'   			: req.body.studentState,
                                                                                                'studentCity'    			: req.body.studentCity,
                                                                                                'pincode'        			: req.body.pincode,
                                                                                                'category'       			: req.body.category,
                                                                                                'subCategory'    			: subCategory,
                                                                                                'studentEmail'   			: req.body.studentEmail,
                                                                                                'genderType'     			: req.body.genderType,
                                                                                                // 'imgSrc'         			: imgSrc
                                                                                            }
                                                                                        }
                                                                                    )
                                                                                .exec()
                                                                                .then(smdata=>{
                                                                                    res.status(200).json({message:"Updated into Student Master"})   
                                                                                })
                                                                                .catch(err =>{
                                                                                    console.log(err);
                                                                                    res.status(500).json({
                                                                                    error: err
                                                                                    });
                                                                                });                        
                                                            }else{
                                                                var studentmaster = new StudentMaster({
                                                                                                    '_id'                       : new mongoose.Types.ObjectId(),
                                                                                                    'studentId'        			: req.body.studUserId,
                                                                                                    'studentFirstName' 			: req.body.studentFirstName,
                                                                                                    'studentMiddleName'			: req.body.studentMiddleName,
                                                                                                    'studentLastName'  			: req.body.studentLastName,
                                                                                                    'studentFullName'   		: req.body.studentFirstName+' '+req.body.studentMiddleName+' '+req.body.studentLastName,
                                                                                                    'mobileNumber'   			: req.body.mobileNumber,
                                                                                                    'studentDOB'     			: req.body.studentDOB,
                                                                                                    'studentAge'     			: req.body.age,
                                                                                                    'schoolName'     			: req.body.schoolName,
                                                                                                    'franchiseName'  			: req.body.franchiseName,
                                                                                                    'companyId'   	 			: parseInt(req.body.companyId),
                                                                                                    'franchiseId'               : req.body.franchiseUserId,
                                                                                                    'franchiseMobileNumber'  	: req.body.franchiseMobileNumber,
                                                                                                    'studentAddress' 			: req.body.studentAddress,
                                                                                                    'studentCountry' 			: req.body.studentCountry,
                                                                                                    'studentState'   			: req.body.studentState,
                                                                                                    'studentCity'    			: req.body.studentCity,
                                                                                                    'pincode'        			: req.body.pincode,
                                                                                                    'category'       			: req.body.category,
                                                                                                    'subCategory'    			: subCategory,
                                                                                                    'studentEmail'   			: req.body.studentEmail,
                                                                                                    'genderType'     			: req.body.genderType,
                                                                                                    'createdAt'      			: new Date(),
                                                                                                    'updateProfilePermission'   : "Blocked"
                                                                                                    // 'imgSrc'         			: imgSrc,
                                                                                                });   
                                                                studentmaster.save()
                                                                             .then(sdata=>{
                                                                                 res.status(200).json({message:"Inserted into Student Master"})
                                                                             })
                                                                             .catch(err =>{
                                                                                console.log(err);
                                                                                res.status(500).json({
                                                                                error: err
                                                                                });
                                                                            });
                                                            }
                                                        })
                                                        .catch(err =>{
                                                            console.log(err);
                                                            res.status(500).json({
                                                            error: err
                                                            });
                                                        });                                
                                    }else{
                                        res.status(404).json({message:"Student Not Found"});
                                    }
                                })
                                .catch(err =>{
                                    console.log(err);
                                    res.status(500).json({
                                    error: err
                                    });
                                });
                        }else{
                            res.status(404).json({message:"Franchise Not Found"});
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                          error: err
                        });
                    });
});

module.exports = router;
