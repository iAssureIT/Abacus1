const mongoose	= require("mongoose");

const Instructions = require('../models/instructionmasters');

exports.fetch_instructions = (req,res,next)=>{
    var instType = req.body.instype;
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