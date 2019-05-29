const mongoose	= require("mongoose");

const FranchiseDetailsMaster = require('../models/franchisedetails');

exports.fetch_frachiseName = (req,res,next)=>{
    var franchiseId = req.params.franchiseId;
    FranchiseDetailsMaster.find({_id:franchiseId})
            .select("franchiseName")
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

