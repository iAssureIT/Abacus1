const mongoose	= require("mongoose");

const NotificationMasters = require('../models/notificationmasters');

exports.fetch_notificationmasters = (req,res,next)=>{
    NotificationMasters.find({status:req.params.status})
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