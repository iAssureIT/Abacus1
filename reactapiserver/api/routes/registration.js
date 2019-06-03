
/*Need to work */
const express 	= require("express");
const router 	= express.Router();

const TempImages        = require('../models/tempimages');
const StudentMaster     = require('../models/studentmasters'); 
const FranchiseDetails  = require('../models/franchisedetails');
const User              = require('../models/users');
const CategoryMasters   = require('../models/categorymasters');

router.patch('/', (req,res,next) => {
    var studentId       = req.body.studentId;
    var studFormValues  = req.body.studFormValues; 
    var imgSrc          = '';
    TempImages.findOne({userId:studentId})    
            .select("imagePath")
            .exec()
            .then(img=>{
                if(img){
                    //code to be updated
                    if(studFormValues.franchiseName && studFormValues.franchiseMobileNumber ){
                        var dateofBirth = new Date(studFormValues.studentDOB); 
                        var today = new Date;
                        var age = Math.floor((today-dateofBirth)/(365.25*24*60*60*1000));
                        if(age > 0){
                            FranchiseDetails.findOne({companyId:parseInt(studFormValues.companyId)})                          
                                            .select("_id franchiseCodeForCompanyId")
                                            .exec()
                                            .then(franchise=>{
                                                if(franchise){
                                                    TempImages.deleteOne({userId:studentId})
                                                              .exec()
                                                              .then(tempImg=>{
                                                                    User.updateOne(
                                                                        {_id:studentId},
                                                                        {
                                                                            $set:{
                                                                                "profile.firstname"     : studFormValues.studentFirstName,
                                                                                "profile.lastname"      : studFormValues.studentLastName,
                                                                                "profile.fullName"      : studFormValues.studentFirstName+' '+studFormValues.studentLastName,
                                                                                "profile.mobNumber"     : studFormValues.mobileNumber,
                                                                                "profile.franchiseName" : studFormValues.franchiseName,
                                                                                "profile.franchise_id"  : franchise.franchiseCodeForCompanyId,
                                                                                "profile.userProfile"      : img.imagePath
                                                                            }
                                                                        }
                                                                    )
                                                                    .exec()
                                                                    .then(user=>{
                                                                        StudentMaster.findOne({_id:studFormValues._id})
                                                                                    .select("imgSrc")
                                                                                    .exec()
                                                                                    .then(studentImg=>{
                                                                                        if(studentImg){
                                                                                            if(studentImg.imgSrc){
                                                                                                //copy from there
                                                                                                if(studFormValues.franchiseName && studFormValues.franchiseMobileNumber ){
                                                                                                    var dateofBirth = new Date(studFormValues.studentDOB); 
                                                                                                    var today = new Date;
                                                                                                    var age = Math.floor((today-dateofBirth)/(365.25*24*60*60*1000));
                                                                                                    if(age > 0){
                                                                                                        FranchiseDetails.findOne({companyId:parseInt(studFormValues.companyId)})                          
                                                                                                                        .select("_id franchiseCodeForCompanyId")
                                                                                                                        .exec()
                                                                                                                        .then(franchise=>{
                                                                                                                            if(franchise){
                                                                                                                                User.updateOne(
                                                                                                                                        {_id:studentId},
                                                                                                                                        {
                                                                                                                                            $set:{
                                                                                                                                                "profile.firstname"     : studFormValues.studentFirstName,
                                                                                                                                                "profile.lastname"      : studFormValues.studentLastName,
                                                                                                                                                "profile.fullName"      : studFormValues.studentFirstName+' '+studFormValues.studentLastName,
                                                                                                                                                "profile.mobNumber"     : studFormValues.mobileNumber,
                                                                                                                                                "profile.franchiseName" : studFormValues.franchiseName,
                                                                                                                                                "profile.franchise_id"  : franchise.franchiseCodeForCompanyId,
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    )
                                                                                                                                    .exec()
                                                                                                                                    .then(user=>{
                                                                                                                                        CategoryMasters.findOne({categoryName:studFormValues.category})
                                                                                                                                                        .select("categoryName levels")
                                                                                                                                                        .exec()
                                                                                                                                                        .then(data =>{
                                                                                                                                                            if(age<=7){
                                                                                                                                                                var subCategory = data.categoryName+'1';
                                                                                                                                                            }else if(age>7 && age<=9){
                                                                                                                                                                var subCategory = data.categoryName+'2';
                                                                                                                                                            }else if(age>9 && age<=11){
                                                                                                                                                                var subCategory = data.categoryName+'3';
                                                                                                                                                            }else if(age>11){
                                                                                                                                                                var subCategory = data.categoryName+'4';
                                                                                                                                                            }
                                                                                                                                                            if(subCategory){
                                                                                                                                                                StudentMaster.updateOne(
                                                                                                                                                                                {_id:studFormValues._id},
                                                                                                                                                                                {
                                                                                                                                                                                    $set:{
                                                                                                                                                                                        'studentFirstName'  		: studFormValues.studentFirstName,
                                                                                                                                                                                        'studentMiddleName' 		: studFormValues.studentMiddleName,
                                                                                                                                                                                        'studentLastName'   		: studFormValues.studentLastName,
                                                                                                                                                                                        'studentFullName'   		: studFormValues.studentFirstName+' '+studFormValues.studentMiddleName+ ' '+studFormValues.studentLastName,
                                                                                                                                                                                        'mobileNumber'   			: studFormValues.mobileNumber,
                                                                                                                                                                                        'studentDOB'     			: studFormValues.studentDOB,
                                                                                                                                                                                        'studentAge'     			: age,
                                                                                                                                                                                        'schoolName'     			: studFormValues.schoolName,
                                                                                                                                                                                        'franchiseName'  			: studFormValues.franchiseName,
                                                                                                                                                                                        'companyId'    				: parseInt(studFormValues.companyId),
                                                                                                                                                                                        'franchiseId'               : franchise.franchiseCodeForCompanyId,
                                                                                                                                                                                        'franchiseMobileNumber' 	: studFormValues.franchiseMobileNumber,
                                                                                                                                                                                        'studentAddress' 			: studFormValues.studentAddress,
                                                                                                                                                                                        'studentCountry' 			: studFormValues.studentCountry,
                                                                                                                                                                                        'studentState'   			: studFormValues.studentState,
                                                                                                                                                                                        'studentCity'    			: studFormValues.studentCity,
                                                                                                                                                                                        'pincode'        			: studFormValues.pincode,
                                                                                                                                                                                        'category'       			: studFormValues.category,
                                                                                                                                                                                        'subCategory'    			: subCategory,
                                                                                                                                                                                        'studentEmail'   			: studFormValues.studentEmail,
                                                                                                                                                                                        'genderType'     			: studFormValues.genderType,
                                                                                                                                                                                        'imgSrc'         			: studentImg.imgSrc,
                                                                                                                                                                                        'profileEditStatus'         : "Blocked"                                                                                                                                }
                                                                                                                                                                                }
                                                                                                                                                                                )
                                                                                                                                                                                .exec()
                                                                                                                                                                                .then(data=>{
                                                                                                                                                                                    res.status(200).json("Student updated sucessfully");
                                                                                                                                                                                })
                                                                                                                                                                                .catch(err =>{
                                                                                                                                                                                console.log(err);
                                                                                                                                                                                res.status(500).json({
                                                                                                                                                                                    error: err
                                                                                                                                                                                    });
                                                                                                                                                                                });                     
                                                                                                                                                                // res.status(200).json(subCategory);
                                                                                                                                                            }
                                                                                                                                                        })
                                                                                                                                                        .catch(err =>{
                                                                                                                                                        console.log(err);
                                                                                                                                                        res.status(500).json({
                                                                                                                                                            error: err
                                                                                                                                                            });
                                                                                                                                                        });
                                                                                                                                        // res.status(200).json("User Updated");
                                                                                                                                    })
                                                                                                                                    .catch(err =>{
                                                                                                                                        console.log(err);
                                                                                                                                        res.status(500).json({
                                                                                                                                            error: err
                                                                                                                                            });
                                                                                                                                    });            
                                                                                                                                // res.status(200).json("franchise found");
                                                                                                                            }else{
                                                                                                                                res.status(404).json("franchiseUserIdNotFound");
                                                                                                                            }
                                                                                                                        })
                                                                                                                        .catch(err =>{
                                                                                                                            console.log(err);
                                                                                                                            res.status(500).json({
                                                                                                                                error: err
                                                                                                                                });
                                                                                                                        });
                                                                                                    }else{
                                                                                                        res.status(200).json("Your age must be 1 year old");
                                                                                                    }  
                                                                                                }else{
                                                                                                    res.status(200).json("Franchise name and franchise mobile number required");
                                                                                                }
                                                                                                //copy till this
                                                                                            }else{
                                                                                                res.status(404).json("Please upload profile Image");                                        
                                                                                            }
                                                                                        }else{
                                                                                            if(studFormValues.franchiseName && studFormValues.franchiseMobileNumber ){
                                                                                                var dateofBirth = new Date(studFormValues.studentDOB); 
                                                                                                var today = new Date;
                                                                                                var age = Math.floor((today-dateofBirth)/(365.25*24*60*60*1000));
                                                                                                if(age > 0){
                                                                                                    FranchiseDetails.findOne({companyId:parseInt(studFormValues.companyId)})                          
                                                                                                                    .select("_id franchiseCodeForCompanyId")
                                                                                                                    .exec()
                                                                                                                    .then(franchise=>{
                                                                                                                        if(franchise){
                                                                                                                            User.updateOne(
                                                                                                                                    {_id:studentId},
                                                                                                                                    {
                                                                                                                                        $set:{
                                                                                                                                            "profile.firstname"     : studFormValues.studentFirstName,
                                                                                                                                            "profile.lastname"      : studFormValues.studentLastName,
                                                                                                                                            "profile.fullName"      : studFormValues.studentFirstName+' '+studFormValues.studentLastName,
                                                                                                                                            "profile.mobNumber"     : studFormValues.mobileNumber,
                                                                                                                                            "profile.franchiseName" : studFormValues.franchiseName,
                                                                                                                                            "profile.franchise_id"  : franchise.franchiseCodeForCompanyId,
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                )
                                                                                                                                .exec()
                                                                                                                                .then(user=>{
                                                                                                                                    CategoryMasters.findOne({categoryName:studFormValues.category})
                                                                                                                                                    .select("categoryName levels")
                                                                                                                                                    .exec()
                                                                                                                                                    .then(data =>{
                                                                                                                                                        if(age<=7){
                                                                                                                                                            var subCategory = data.categoryName+'1';
                                                                                                                                                        }else if(age>7 && age<=9){
                                                                                                                                                            var subCategory = data.categoryName+'2';
                                                                                                                                                        }else if(age>9 && age<=11){
                                                                                                                                                            var subCategory = data.categoryName+'3';
                                                                                                                                                        }else if(age>11){
                                                                                                                                                            var subCategory = data.categoryName+'4';
                                                                                                                                                        }
                                                                                                                                                        if(subCategory){
                                                                                                                                                            StudentMaster.insertOne(
                                                                                                                                                                            {
                                                                                                                                                                                'studentId'        			: studentId,
                                                                                                                                                                                'studentFirstName'  		: studFormValues.studentFirstName,
                                                                                                                                                                                'studentMiddleName' 		: studFormValues.studentMiddleName,
                                                                                                                                                                                'studentLastName'   		: studFormValues.studentLastName,
                                                                                                                                                                                'studentFullName'   		: studFormValues.studentFirstName+' '+studFormValues.studentMiddleName+ ' '+studFormValues.studentLastName,
                                                                                                                                                                                'mobileNumber'   			: studFormValues.mobileNumber,
                                                                                                                                                                                'studentDOB'     			: studFormValues.studentDOB,
                                                                                                                                                                                'studentAge'     			: age,
                                                                                                                                                                                'schoolName'     			: studFormValues.schoolName,
                                                                                                                                                                                'franchiseName'  			: studFormValues.franchiseName,
                                                                                                                                                                                'companyId'    				: parseInt(studFormValues.companyId),
                                                                                                                                                                                'franchiseId'               : franchise.franchiseCodeForCompanyId,
                                                                                                                                                                                'franchiseMobileNumber' 	: studFormValues.franchiseMobileNumber,
                                                                                                                                                                                'studentAddress' 			: studFormValues.studentAddress,
                                                                                                                                                                                'studentCountry' 			: studFormValues.studentCountry,
                                                                                                                                                                                'studentState'   			: studFormValues.studentState,
                                                                                                                                                                                'studentCity'    			: studFormValues.studentCity,
                                                                                                                                                                                'pincode'        			: studFormValues.pincode,
                                                                                                                                                                                'category'       			: studFormValues.category,
                                                                                                                                                                                'subCategory'    			: subCategory,
                                                                                                                                                                                'studentEmail'   			: studFormValues.studentEmail,
                                                                                                                                                                                'genderType'     			: studFormValues.genderType,
                                                                                                                                                                                'imgSrc'         			: studentImg.imgSrc,
                                                                                                                                                                                'profileEditStatus'         : "Blocked"
                                                                                                                                                                            }
                                                                                                                                                                            )
                                                                                                                                                                            .exec()
                                                                                                                                                                            .then(data=>{
                                                                                                                                                                                res.status(200).json("Student inserted sucessfully");
                                                                                                                                                                            })
                                                                                                                                                                            .catch(err =>{
                                                                                                                                                                            console.log(err);
                                                                                                                                                                            res.status(500).json({
                                                                                                                                                                                error: err
                                                                                                                                                                                });
                                                                                                                                                                            });                     
                                                                                                                                                            // res.status(200).json(subCategory);
                                                                                                                                                        }
                                                                                                                                                    })
                                                                                                                                                    .catch(err =>{
                                                                                                                                                    console.log(err);
                                                                                                                                                    res.status(500).json({
                                                                                                                                                        error: err
                                                                                                                                                        });
                                                                                                                                                    });
                                                                                                                                    // res.status(200).json("User Updated");
                                                                                                                                })
                                                                                                                                .catch(err =>{
                                                                                                                                    console.log(err);
                                                                                                                                    res.status(500).json({
                                                                                                                                        error: err
                                                                                                                                        });
                                                                                                                                });            
                                                                                                                            // res.status(200).json("franchise found");
                                                                                                                        }else{
                                                                                                                            res.status(404).json("franchiseUserIdNotFound");
                                                                                                                        }
                                                                                                                    })
                                                                                                                    .catch(err =>{
                                                                                                                        console.log(err);
                                                                                                                        res.status(500).json({
                                                                                                                            error: err
                                                                                                                            });
                                                                                                                    });
                                                                                                }else{
                                                                                                    res.status(200).json("Your age must be 1 year old");
                                                                                                }  
                                                                                            }else{
                                                                                                res.status(200).json("Franchise name and franchise mobile number required");
                                                                                            }    
                                                                                        }
                                                                                    })
                                                                                    .catch(err =>{
                                                                                        console.log(err);
                                                                                        res.status(500).json({
                                                                                            error: err
                                                                                            });
                                                                                    });
                                                                    })
                                                                    .catch(err =>{
                                                                        console.log(err);
                                                                        res.status(500).json({
                                                                            error: err
                                                                            });
                                                                    });
                                                               })
                                                              .catch(err =>{
                                                                    console.log(err);
                                                                    res.status(500).json({
                                                                        error: err
                                                                        });
                                                                });                  
                                                    // res.status(200).json("franchise found");
                                                }else{
                                                    res.status(404).json("franchiseUserIdNotFound");
                                                }
                                            })
                                            .catch(err =>{
                                                console.log(err);
                                                res.status(500).json({
                                                    error: err
                                                    });
                                            });
                        }else{
                            res.status(200).json("Your age must be 1 year old");
                        }  
                    }else{
                        res.status(200).json("Franchise name and franchise mobile number required");
                    }
                    // res.status(200).json("ImgFound");
                }else{
                    StudentMaster.findOne({_id:studFormValues._id})
                                 .select("imgSrc")
                                 .exec()
                                 .then(studentImg=>{
                                    if(studentImg){
                                        if(studentImg.imgSrc){
                                            //copy from there
                                            if(studFormValues.franchiseName && studFormValues.franchiseMobileNumber ){
                                                var dateofBirth = new Date(studFormValues.studentDOB); 
                                                var today = new Date;
                                                var age = Math.floor((today-dateofBirth)/(365.25*24*60*60*1000));
                                                if(age > 0){
                                                    FranchiseDetails.findOne({companyId:parseInt(studFormValues.companyId)})                          
                                                                    .select("_id franchiseCodeForCompanyId")
                                                                    .exec()
                                                                    .then(franchise=>{
                                                                        if(franchise){
                                                                            User.updateOne(
                                                                                    {_id:studentId},
                                                                                    {
                                                                                        $set:{
                                                                                            "profile.firstname"     : studFormValues.studentFirstName,
                                                                                            "profile.lastname"      : studFormValues.studentLastName,
                                                                                            "profile.fullName"      : studFormValues.studentFirstName+' '+studFormValues.studentLastName,
                                                                                            "profile.mobNumber"     : studFormValues.mobileNumber,
                                                                                            "profile.franchiseName" : studFormValues.franchiseName,
                                                                                            "profile.franchise_id"  : franchise.franchiseCodeForCompanyId,
                                                                                        }
                                                                                    }
                                                                                )
                                                                                .exec()
                                                                                .then(user=>{
                                                                                    CategoryMasters.findOne({categoryName:studFormValues.category})
                                                                                                    .select("categoryName levels")
                                                                                                    .exec()
                                                                                                    .then(data =>{
                                                                                                        if(age<=7){
                                                                                                            var subCategory = data.categoryName+'1';
                                                                                                        }else if(age>7 && age<=9){
                                                                                                            var subCategory = data.categoryName+'2';
                                                                                                        }else if(age>9 && age<=11){
                                                                                                            var subCategory = data.categoryName+'3';
                                                                                                        }else if(age>11){
                                                                                                            var subCategory = data.categoryName+'4';
                                                                                                        }
                                                                                                        if(subCategory){
                                                                                                            StudentMaster.updateOne(
                                                                                                                            {_id:studFormValues._id},
                                                                                                                            {
                                                                                                                                $set:{
                                                                                                                                    'studentFirstName'  		: studFormValues.studentFirstName,
                                                                                                                                    'studentMiddleName' 		: studFormValues.studentMiddleName,
                                                                                                                                    'studentLastName'   		: studFormValues.studentLastName,
                                                                                                                                    'studentFullName'   		: studFormValues.studentFirstName+' '+studFormValues.studentMiddleName+ ' '+studFormValues.studentLastName,
                                                                                                                                    'mobileNumber'   			: studFormValues.mobileNumber,
                                                                                                                                    'studentDOB'     			: studFormValues.studentDOB,
                                                                                                                                    'studentAge'     			: age,
                                                                                                                                    'schoolName'     			: studFormValues.schoolName,
                                                                                                                                    'franchiseName'  			: studFormValues.franchiseName,
                                                                                                                                    'companyId'    				: parseInt(studFormValues.companyId),
                                                                                                                                    'franchiseId'               : franchise.franchiseCodeForCompanyId,
                                                                                                                                    'franchiseMobileNumber' 	: studFormValues.franchiseMobileNumber,
                                                                                                                                    'studentAddress' 			: studFormValues.studentAddress,
                                                                                                                                    'studentCountry' 			: studFormValues.studentCountry,
                                                                                                                                    'studentState'   			: studFormValues.studentState,
                                                                                                                                    'studentCity'    			: studFormValues.studentCity,
                                                                                                                                    'pincode'        			: studFormValues.pincode,
                                                                                                                                    'category'       			: studFormValues.category,
                                                                                                                                    'subCategory'    			: subCategory,
                                                                                                                                    'studentEmail'   			: studFormValues.studentEmail,
                                                                                                                                    'genderType'     			: studFormValues.genderType,
                                                                                                                                    'imgSrc'         			: studentImg.imgSrc,
                                                                                                                                    'profileEditStatus'         : "Blocked"                                                                                                                                }
                                                                                                                            }
                                                                                                                            )
                                                                                                                            .exec()
                                                                                                                            .then(data=>{
                                                                                                                                res.status(200).json("Student updated sucessfully");
                                                                                                                            })
                                                                                                                            .catch(err =>{
                                                                                                                            console.log(err);
                                                                                                                            res.status(500).json({
                                                                                                                                error: err
                                                                                                                                });
                                                                                                                            });                     
                                                                                                            // res.status(200).json(subCategory);
                                                                                                        }
                                                                                                    })
                                                                                                    .catch(err =>{
                                                                                                    console.log(err);
                                                                                                    res.status(500).json({
                                                                                                        error: err
                                                                                                        });
                                                                                                    });
                                                                                    // res.status(200).json("User Updated");
                                                                                })
                                                                                .catch(err =>{
                                                                                    console.log(err);
                                                                                    res.status(500).json({
                                                                                        error: err
                                                                                        });
                                                                                });            
                                                                            // res.status(200).json("franchise found");
                                                                        }else{
                                                                            res.status(404).json("franchiseUserIdNotFound");
                                                                        }
                                                                    })
                                                                    .catch(err =>{
                                                                        console.log(err);
                                                                        res.status(500).json({
                                                                            error: err
                                                                            });
                                                                    });
                                                }else{
                                                    res.status(200).json("Your age must be 1 year old");
                                                }  
                                            }else{
                                                res.status(200).json("Franchise name and franchise mobile number required");
                                            }
                                            //copy till this
                                        }else{
                                            res.status(404).json("Please upload profile Image");                                        
                                        }
                                    }else{
                                        if(studFormValues.franchiseName && studFormValues.franchiseMobileNumber ){
                                            var dateofBirth = new Date(studFormValues.studentDOB); 
                                            var today = new Date;
                                            var age = Math.floor((today-dateofBirth)/(365.25*24*60*60*1000));
                                            if(age > 0){
                                                FranchiseDetails.findOne({companyId:parseInt(studFormValues.companyId)})                          
                                                                .select("_id franchiseCodeForCompanyId")
                                                                .exec()
                                                                .then(franchise=>{
                                                                    if(franchise){
                                                                        User.updateOne(
                                                                                {_id:studentId},
                                                                                {
                                                                                    $set:{
                                                                                        "profile.firstname"     : studFormValues.studentFirstName,
                                                                                        "profile.lastname"      : studFormValues.studentLastName,
                                                                                        "profile.fullName"      : studFormValues.studentFirstName+' '+studFormValues.studentLastName,
                                                                                        "profile.mobNumber"     : studFormValues.mobileNumber,
                                                                                        "profile.franchiseName" : studFormValues.franchiseName,
                                                                                        "profile.franchise_id"  : franchise.franchiseCodeForCompanyId,
                                                                                    }
                                                                                }
                                                                            )
                                                                            .exec()
                                                                            .then(user=>{
                                                                                CategoryMasters.findOne({categoryName:studFormValues.category})
                                                                                                .select("categoryName levels")
                                                                                                .exec()
                                                                                                .then(data =>{
                                                                                                    if(age<=7){
                                                                                                        var subCategory = data.categoryName+'1';
                                                                                                    }else if(age>7 && age<=9){
                                                                                                        var subCategory = data.categoryName+'2';
                                                                                                    }else if(age>9 && age<=11){
                                                                                                        var subCategory = data.categoryName+'3';
                                                                                                    }else if(age>11){
                                                                                                        var subCategory = data.categoryName+'4';
                                                                                                    }
                                                                                                    if(subCategory){
                                                                                                        StudentMaster.insertOne(
                                                                                                                        {
                                                                                                                            'studentId'        			: studentId,
                                                                                                                            'studentFirstName'  		: studFormValues.studentFirstName,
                                                                                                                            'studentMiddleName' 		: studFormValues.studentMiddleName,
                                                                                                                            'studentLastName'   		: studFormValues.studentLastName,
                                                                                                                            'studentFullName'   		: studFormValues.studentFirstName+' '+studFormValues.studentMiddleName+ ' '+studFormValues.studentLastName,
                                                                                                                            'mobileNumber'   			: studFormValues.mobileNumber,
                                                                                                                            'studentDOB'     			: studFormValues.studentDOB,
                                                                                                                            'studentAge'     			: age,
                                                                                                                            'schoolName'     			: studFormValues.schoolName,
                                                                                                                            'franchiseName'  			: studFormValues.franchiseName,
                                                                                                                            'companyId'    				: parseInt(studFormValues.companyId),
                                                                                                                            'franchiseId'               : franchise.franchiseCodeForCompanyId,
                                                                                                                            'franchiseMobileNumber' 	: studFormValues.franchiseMobileNumber,
                                                                                                                            'studentAddress' 			: studFormValues.studentAddress,
                                                                                                                            'studentCountry' 			: studFormValues.studentCountry,
                                                                                                                            'studentState'   			: studFormValues.studentState,
                                                                                                                            'studentCity'    			: studFormValues.studentCity,
                                                                                                                            'pincode'        			: studFormValues.pincode,
                                                                                                                            'category'       			: studFormValues.category,
                                                                                                                            'subCategory'    			: subCategory,
                                                                                                                            'studentEmail'   			: studFormValues.studentEmail,
                                                                                                                            'genderType'     			: studFormValues.genderType,
                                                                                                                            'imgSrc'         			: studentImg.imgSrc,
                                                                                                                            'profileEditStatus'         : "Blocked"
                                                                                                                        }
                                                                                                                        )
                                                                                                                        .exec()
                                                                                                                        .then(data=>{
                                                                                                                            res.status(200).json("Student inserted sucessfully");
                                                                                                                        })
                                                                                                                        .catch(err =>{
                                                                                                                        console.log(err);
                                                                                                                        res.status(500).json({
                                                                                                                            error: err
                                                                                                                            });
                                                                                                                        });                     
                                                                                                        // res.status(200).json(subCategory);
                                                                                                    }
                                                                                                })
                                                                                                .catch(err =>{
                                                                                                console.log(err);
                                                                                                res.status(500).json({
                                                                                                    error: err
                                                                                                    });
                                                                                                });
                                                                                // res.status(200).json("User Updated");
                                                                            })
                                                                            .catch(err =>{
                                                                                console.log(err);
                                                                                res.status(500).json({
                                                                                    error: err
                                                                                    });
                                                                            });            
                                                                        // res.status(200).json("franchise found");
                                                                    }else{
                                                                        res.status(404).json("franchiseUserIdNotFound");
                                                                    }
                                                                })
                                                                .catch(err =>{
                                                                    console.log(err);
                                                                    res.status(500).json({
                                                                        error: err
                                                                        });
                                                                });
                                            }else{
                                                res.status(200).json("Your age must be 1 year old");
                                            }  
                                        }else{
                                            res.status(200).json("Franchise name and franchise mobile number required");
                                        }    
                                    }
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
});

module.exports = router;
