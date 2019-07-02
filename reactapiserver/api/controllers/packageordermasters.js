const mongoose	= require("mongoose");

const PackageOrderMaster = require('../models/packageordermasters');

exports.fetch_mypackageorder = (req,res,next)=>{
    var sId = req.params.studentId;
    PackageOrderMaster.find({buyerId:sId,status:"paid"})
            .select("transactionId amount paymentDate packages")
            .sort({paymentDate: -1})
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

exports.check_packageorder = (req,res,next)=>{
  PackageOrderMaster.find({_id:req.params.ID})
          .exec()
          .then(data =>{
            if(data.packages.length > 0){
              console.log('packageorder found ');
              res.status(200).json("packagesAdded");
            }else{
              console.log('packageorder not found ');
              res.status(200).json("notAdded");
            }
          })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
              error: err
              });
          });
}

exports.invoice_display = (req,res,next)=>{
  console.log('invoice_ID ',req.params.invoice_ID);
  PackageOrderMaster.findOne({_id:req.params.invoice_ID})
          .exec()
          .then(data =>{
            var orderMasterData = data;
            if(orderMasterData.packages){
              var packageTotal = orderMasterData.packages.reduce((addprice,elem)=>{
                return  addprice + elem.packagePrice;
              },0);
              res.status(200).json({
                orderMasterData : orderMasterData,
                packageTotal    : packageTotal
              });
            }
          })
          .catch(err =>{
            console.log(err);
            res.status(500).json({
              error: err
              });
          });
}

exports.find_packagID = (req,res,next)=>{

  PackageOrderMaster.findOne({"_id":req.params.ID,"packages.packageId":req.params.packageId})
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

exports.update_packageID = (req,res,next) =>{
  PackageOrderMaster.updateOne(
                                  {"_id":req.params.ID},
                                  {
                                    $pull:{
                                      "packages":{
                                        "packageId":req.params.packageId
                                      }
                                    }
                                  }
                              )
                    .exec()
                    .then(data =>{
                      if(data.nModified == 1){
                        res.status(200).json("Package Order Updated");
                      }else{
                        res.status(200).json("Something Went wrong");
                      }
                    })
                    .catch(err =>{
                      console.log(err);
                      res.status(500).json({
                        error: err
                        });
                    });
}

exports.insert_packageorder = (req,res,next) =>{
  PackageOrderMaster.find({})
                    .count()
                    .exec()
                    .then(pOMasterData =>{
                      if(pOMasterData>0){
                        var invoiceNum = pOMasterData+1;	
                      }else{
                        var invoiceNum = 1;
                      }
                      const orderId = new PackageOrderMaster({
                          buyerId         : req.body.buyerId,
                          studentName     : req.body.studentName,
                          franchiseId     : req.body.franchiseId,
                          status          : req.body.status,
                          packages        : [],
                          invoiceId       : invoiceNum,
                          packageStatus   : req.body.packageStatus,
                      });
                      orderId .save()
                              .then(result =>{
                                res.status(201).json('Package Order Inserted')
                              })
                              .catch(err =>{
                                console.log(err);
                                res.status(500).json({
                                  error: err
                                });
                              });
                    })
                    .catch(err =>{
                      console.log(err);
                      res.status(500).json({
                        error: err
                        });
                    });
}

exports.update_package = (req,res,next) =>{
  switch(req.params.action){
    case 'add'    :
        PackageOrderMaster.updateOne(
                                {"_id":req.params.packageId},
                                {
                                  $push:{
                                    "packages":{
                                      'packageId'       : req.params.packageId, 
                                      'packageName'     : req.body.packageName,
                                      'category'        : req.body.categoryName,
                                      'subCategory'     : req.body.subCategory,
                                      'packagePrice'    : req.body.PackagePrice,
                                      'NoOfPracticeTest': req.body.NoOfPracticeTest,
                                    }
                                  }
                                }
                            )
                          .exec()
                          .then(data =>{
                              if(data.nModified == 1){
                                res.status(200).json("Package Order Updated");
                              }else{
                                res.status(200).json("Something Went wrong");
                              }
                          })
                          .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                              error: err
                            });
                          });
      break;
    case 'remove' :
        PackageOrderMaster.updateOne(
                                {"_id":req.params.packageId},
                                {
                                  $pull:{
                                    "packages":{
                                      'packageId'       : req.params.packageId, 
                                    }
                                  }
                                }
                            )
                          .exec()
                          .then(data =>{
                              if(data.nModified == 1){
                                res.status(200).json("Package Order Updated");
                              }else{
                                res.status(200).json("Something Went wrong");
                              }
                          })
                          .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                              error: err
                            });
                          });
      break;
    default       :
      res.status(500).json("Invalid action option")
      break;
  }
  
}
