const mongoose	= require("mongoose");

const PackageOrderMaster = require('../models/packageordermasters');

exports.fetch_mypackageorder = (req,res,next)=>{
    var sId = req.params.studentId;
    PackageOrderMaster.find({buyerId:sId,status:"paid"})
            .select("transactionId amount paymentDate")
            .exec()
            .then(data =>{
              console.log('data ',data);
              res.status(200).json(data);
            })
            .catch(err =>{
              console.log(err);
              res.status(500).json({
                error: err
                });
            });
}

exports.fetch_mypackageorderreceipt = (req,res,next)=>{
  console.log('In package Receipt');
  var sId = req.params.studentId;
  var receiptId = req.params.receiptId;
  PackageOrderMaster.findOne({_id:receiptId , buyerId:sId,status:"paid"})
          .select("status amount transactionId billnumbers paymentDate")
          .exec()
          .then(data =>{
            console.log('data ',data);
            res.status(200).json(data);
          })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
              error: err
              });
          });
}