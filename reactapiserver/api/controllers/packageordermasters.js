const mongoose	= require("mongoose");

const PackageOrderMaster = require('../models/packageordermasters');

exports.fetch_mypackageorder = (req,res,next)=>{
    var sId = req.body.studentId;
    PackageOrderMaster.find({buyerId:sId,status:"paid"})
            .select("transactionId amount paymentDate")
		    .exec()
            .then(packageorder =>{
              console.log('packageorder ',packageorder);
              res.status(200).json(packageorder);
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
  var sId = req.body.studentId;
  var receiptId = req.body.receiptId;
  PackageOrderMaster.findOne({_id:receiptId , buyerId:sId,status:"paid"})
          .select("status amount transactionId billnumbers paymentDate")
          .exec()
          .then(packageorderreceipt =>{
            console.log('packageorderreceipt ',packageorderreceipt);
            res.status(200).json(packageorderreceipt);
          })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
              error: err
              });
          });
}