const mongoose	= require("mongoose");

const Instructions = require('../models/instructionmasters');

exports.fetch_instructions = (req,res,next)=>{
    var instType = req.params.instype;
    Instructions.find({instructionFor:instType})
            .select("instruction")
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