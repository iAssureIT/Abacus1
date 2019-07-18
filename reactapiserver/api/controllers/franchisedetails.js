const mongoose	= require("mongoose");

const FranchiseDetailsMaster = require('../models/franchisedetails');

exports.fetch_frachiseName = (req,res,next)=>{
    var franchiseId = req.params.franchiseId;
    FranchiseDetailsMaster.find({_id:franchiseId})
            .select("franchiseName")
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

exports.fetch_frachiseName_code_contact = (req,res,next)=>{
  var companyId = parseInt(req.params.companyId);
  FranchiseDetailsMaster.findOne({companyId:companyId, verificationStatus : "Verified"})
          .select("franchiseCodeForCompanyId franchiseName contactNo")
          .exec()
          .then(data =>{
            if(data){
              res.status(200).json(data);
            }else{
              res.status(200).json('franchiseNotFound');
            }
              
          })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
              error: err
              });
          });
}