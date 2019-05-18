const mongoose	= require("mongoose");

const Package = require('../models/package');

exports.list_packages = (req,res,next)=>{
    Package.find({})
           .exec()
           .then(package => {
               console.log('package ',package);
               res.status(200).json(package);
           })
           .catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});

}