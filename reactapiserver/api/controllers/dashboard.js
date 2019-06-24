const mongoose	= require("mongoose");

const PackageOrderMaster = require('../models/packageordermasters');

exports.purchased_packaged = (req,res,next)=>{
    var studentId = req.params.studentID;
    PackageOrderMaster.find({userId:studentId})
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

