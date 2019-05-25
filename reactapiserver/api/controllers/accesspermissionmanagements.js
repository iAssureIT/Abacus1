const mongoose	= require("mongoose");

const AccessPermission  = require('../models/accesspermissionmanagements');
const user              = require('../models/users');

exports.accessPermission = (req,res,next)=>{
    var module          = req.body.module;
    var facilityName    = req.body.facilityName;
    
    Instructions.find({instructionFor:instType})
            .select("instruction")
		    .exec()
            .then(instructions =>{
            //   console.log('packages ',packages);
              res.status(200).json(instructions);
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
              error: err
            });
        });
    
}