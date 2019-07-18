const mongoose	= require("mongoose");

const TempImagesMaster = require('../models/tempimages');

exports.fetch_tempimg = (req,res,next)=>{
    var studentId = req.params.studentId;
    TempImagesMaster.findOne({userId:studentId})
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

exports.insert_img = (req,res,next) =>{
  const tempImg = new TempImagesMaster({
    _id : new mongoose.Types.ObjectId(),
    userId : req.body.studentId,
    imagePath : req.body.imagePath 
  });
  tempImg.save()
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