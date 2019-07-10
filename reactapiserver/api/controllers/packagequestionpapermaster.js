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
    PackageQuestionPaperMaster  .findOne({"questionPaper_id":qpid,"buyerId":studentID,"packageId":packageID,order_id:orderId})
		                        .exec()
                                .then(questionPaperDetails1 =>{
                                    questionPaperDetails = questionPaperDetails1;
                                    if(questionPaperDetails){
                                        PackageManagementMaster .findOne({_id:questionPaperDetails.packageId,order_id:orderId})
                                                            .exec()
                                                            .then(PckgData=>{
                                                                var attempts= PckgData.AttemptOfPracticeTest;
                                                                PackageQuestionPaperMaster  .update(
                                                                                                        {_id:questionPaperDetails._id,order_id:orderId,packageId:packageID,buyerId:studentID,questionPaper_id:qpid},
                                                                                                        {
                                                                                                            $set:{
                                                                                                                ["noOfAttempts."+BtnIndex+".status"]:true,
                                                                                                                ["noOfAttempts."+BtnIndex+".attemptedAt"]:todayDate,
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
                                                            })
                                                            .catch(err =>{
                                                                console.log(err);
                                                                res.status(500).json({
                                                                    error: err
                                                                });
                                                            });
                                    }else{
                                        res.status(200).json("something went wrong");
                                    }
                                })
                                .catch(err =>{
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    });
                                });
    
}

exports.fetch_student_pkgquemaster = (req,res,next)=>{
    PackageQuestionPaperMaster  .find({buyerId:req.params.studentID})
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