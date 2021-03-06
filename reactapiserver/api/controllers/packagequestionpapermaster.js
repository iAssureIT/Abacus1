const mongoose	= require("mongoose");

const PackageQuestionPaperMaster = require('../models/packagequestionpapermasters');
const PackageManagementMaster    = require('../models/packagemanagementmasters');
exports.update_packagequestionpapermaster = (req,res,next)=>{
    // qpid,urlPackageId,BtnIndex,orderId
    var qpid        = req.body.quepaperID;
    var packageID   = req.body.packageID;
    var index       = req.body.index;
    var orderId     = req.body.orderId;
    var studentID   = req.body.studentID;
    var todayDate   = req.body.todayDate;
    var questionPaperDetails    = {}; 
    if(todayDate){
        PackageQuestionPaperMaster  .findOne({"questionPaper_id":qpid,"buyerId":studentID,"packageId":packageID,order_id:orderId})
		                        .exec()
                                .then(questionPaperDetails1 =>{
                                    questionPaperDetails = questionPaperDetails1;
                                    if(questionPaperDetails){
                                                        PackageQuestionPaperMaster  .update(
                                                            {_id:questionPaperDetails._id,order_id:orderId,packageId:packageID,buyerId:studentID,questionPaper_id:qpid},
                                                            {
                                                                $set:{
                                                                    ["noOfAttempts."+index+".status"]:true,
                                                                    ["noOfAttempts."+index+".attemptedAt"]:todayDate,
                                                                }
                                                            }
                                                    )
                                                .exec()
                                                .then(data=>{
                                                    if(data.nModified == 1){
                                                        res.status(200).json("Updated successfully");
                                                    }else{
                                                        res.status(200).json("Something went wrong");
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

    }
     
}

exports.fetch_student_pkgquemaster = (req,res,next)=>{
    PackageQuestionPaperMaster  .find({buyerId:req.params.studentID})
                                .exec()
                                .then(data =>{
                                    res.status(200).json(data);
                                })
                                .catch(err =>{
                                    console.log(err);
                                    res.status(500).json({
                                            error: err
                                        });
                                });

}