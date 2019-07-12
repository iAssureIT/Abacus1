
/*Need to work */
const express 	= require("express");
const router 	= express.Router();

const TempImages        = require('../models/tempimages');
const StudentMaster     = require('../models/studentmasters'); 
const FranchiseDetails  = require('../models/franchisedetails');
const User              = require('../models/users');
const CategoryMasters   = require('../models/categorymasters');

router.post('/', (req,res,next) => {
    var data = req.body;
    res.status(200).json({data});
    // User.updateOne(
    //                 {"_id":req.body.studUserId},
    //                 {
    //                     $set:{
    //                         "profile.firstname"     : req.body.studentFirstName,
    //                         "profile.lastname"      : req.body.studentLastName,
    //                         "profile.fullName"      : req.body.studentFirstName+' '+req.body.studentLastName,
    //                         "profile.mobNumber"     : req.body.mobileNumber,
    //                         "profile.franchiseName" : req.body.franchiseName,
    //                         "profile.franchise_id"  : req.body.companyId,
    //                     } 
    //                 }
    //             )
    //     .exec()
    //     .then(user=>{
    //         if(user.nModified == 1){
                
    //         }else{
    //             res.status(404).json({message:"Student Not Found"});
    //         }
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //         res.status(500).json({
    //           error: err
    //         });
    //     });
});

module.exports = router;
