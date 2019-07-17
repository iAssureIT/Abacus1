const mongoose	= require("mongoose");

const ProjectSettings = require('../models/projectsettings');

exports.fetch_projectsettings = (req,res,next)=>{
    ProjectSettings.findOne({})
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
