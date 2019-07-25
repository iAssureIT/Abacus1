const mongoose	= require("mongoose");

const PackageOrderMaster        = require('../models/packageordermasters');
const PackageManagementMaster   = require('../models/packagemanagementmasters');
const StudentMaster             = require('../models/studentmasters');

exports.fetch_mypackageorder = (req,res,next)=>{
    var sId = req.params.studentId;
    PackageOrderMaster.find({buyerId:sId,status:"paid"})
            .select("transactionId amount paymentDate packages")
            .sort({paymentDate: -1})
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

exports.fetch_mypackageorderreceipt = (req,res,next)=>{
  var sId = req.params.studentId;
  var receiptId = req.params.receiptId;
  PackageOrderMaster.findOne({_id:receiptId , buyerId:sId,status:"paid"})
          .select("status amount transactionId billnumbers paymentDate")
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

exports.check_packageorder = (req,res,next)=>{
  PackageOrderMaster.find({_id:req.params.ID})
          .exec()
          .then(data =>{
            if(data.packages.length > 0){
              res.status(200).json("packagesAdded");
            }else{
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

exports.create_order = (req,res,next) =>{
  if(req.params.Order_ID != '-'){
    PackageOrderMaster.find(
                              {
                                _id:req.params.Order_ID,
                                "packages":{$elemMatch:{packageId:req.params.package_ID}}
                              }
                            )
                      .exec()
                      .then(pom=>{
                        if(pom){
                          PackageOrderMaster.update(
                                                {_id:req.params.Order_ID},
                                                {
                                                  $pull:{
                                                      "packages":{
                                                        "packageId":req.params.package_ID
                                                      }
                                                    } 
                                                }
                                            )
                                            .exec()
                                            .then(pom=>{
                                              if(pom.nModified == 1){
                                                res.status(200).json({message:"Package removed"})
                                              }else{
                                                res.status(200).json({message:"Package not removed"})
                                              }
                                            })
                                            .catch(err =>{
                                              console.log(err);
                                              res.status(500).json({
                                                error: err
                                              });
                                            });                      
                        }else{
                          PackageManagementMaster .find({_id:req.params.package_ID})
                                                  .exec()
                                                  .then(pmm=>{
                                                    if(pmm){
                                                      PackageOrderMaster.update(
                                                                            {_id:req.params.Order_ID},
                                                                            {
                                                                              $push:{
                                                                                  "packages":{
                                                                                    'packageId'   : pmm._id, 
                                                                                    'packageName' : pmm.packageName,
                                                                                    'category'    : pmm.categoryName,
                                                                                    'subCategory' : pmm.subCategory,
                                                                                    'packagePrice': pmm.PackagePrice,
                                                                                    'NoOfPracticeTest': pmm.NoOfPracticeTest,
                                                                                  }
                                                                                } 
                                                                            }
                                                                        )
                                                                        .exec()
                                                                        .then(pom=>{
                                                                          if(pom.nModified == 1){
                                                                            res.status(200).json({message:"Package added"})
                                                                          }else{
                                                                            res.status(200).json({message:"Package not added"})
                                                                          }
                                                                        })
                                                                        .catch(err =>{
                                                                          console.log(err);
                                                                          res.status(500).json({
                                                                            error: err
                                                                          });
                                                                        });                                              
                                                    }else{
                                                      res.status(200).json({message:"Package not found"})       
                                                    }
                                                  })
                                                  .catch(err =>{
                                                    console.log(err);
                                                    res.status(500).json({
                                                      error: err
                                                    });
                                                  });
                        }
                      })
                      .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                          error: err
                        });
                      });
  }else{
    StudentMaster.find({studentId:req.params.student_ID})
                 .exec()
                 .then(sm=>{
                    if(sm){
                      PackageManagementMaster .find({_id:req.params.package_ID})
                                              .exec()
                                              .then(pmm=>{
                                                if(pmm){
                                                  var invoiceNum = PackageOrderMaster.find({}).count() + 1;
                                                  if(invoiceNum){
                                                    var packageOrderMaster = new PackageOrderMaster({
                                                                            '_id'           : new mongoose.Types.ObjectId(),
                                                                            'buyerId'       : req.params.student_ID,
                                                                            'studentName'   : sm.studentFullName,
                                                                            'franchiseId'   : sm.franchiseId,
                                                                            'status'        : 'unPaid',
                                                                            'packages'      : [{
                                                                                                  'packageId'   : pmm._id, 
                                                                                                  'packageName' : pmm.packageName,
                                                                                                  'category'    : pmm.categoryName,
                                                                                                  'subCategory' : pmm.subCategory,
                                                                                                  'packagePrice': pmm.PackagePrice,
                                                                                                  'NoOfPracticeTest': pmm.NoOfPracticeTest,
                                                                                                }],
                                                                            'invoiceId'     : invoiceNum,
                                                                            'packageStatus' : "Valid",
                                                                        }); 
                                                    packageOrderMaster.save()
                                                                      .exec()
                                                                      .then(pom=>{
                                                                          res.status(200).json({message:"Order Placed",ID:pom._id})
                                                                      })
                                                                      .catch(err =>{
                                                                        console.log(err);
                                                                        res.status(500).json({
                                                                          error: err
                                                                        });
                                                                      });                                              
                                                  }
                                                }else{
                                                  res.status(200).json({message:"Package not found"})       
                                                }
                                              })
                                              .catch(err =>{
                                                console.log(err);
                                                res.status(500).json({
                                                  error: err
                                                });
                                              });
                    }else{
                      res.status(200).json({message:"Student Not Found"});
                    }
                 })
                 .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                      error: err
                    });
                  });         
  }
}