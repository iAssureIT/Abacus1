const mongoose	= require("mongoose");

const PackageOrderMaster        = require('../models/packageordermasters');
const QuestionPaperMaster        = require('../models/questionpapermasters');
const PackageQuestionPaperMaster        = require('../models/packagequestionpapermasters');
const PackageManagementMaster   = require('../models/packagemanagementmasters');
const StudentMaster             = require('../models/studentmasters');

exports.fetch_mypackageorder = (req,res,next)=>{
   console.log("fetch_mypackageorder------>",req.params.ID);
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

exports.update_packageorderreceipt = (req,res,next)=>{
   var sId = req.params.studentId;
  var orderId = req.params.orderId;
  var status = req.params.status;
  var transid = req.params.id;
  var billNumbers = req.params.billNumbers;
  var totalAmount = req.params.totalAmount;
    PackageOrderMaster.findOne({"_id":orderId})
                       .exec()
                       .then(orderData=>{
                          if(orderData){
                            // console.log("orderData--->",orderData)
                            PackageOrderMaster.updateOne({"_id":orderId},
                                  {
                                    $set:{
                                      'status':status,
                                      'amount':totalAmount,
                                      "transactionId" : transid,
                                      "billnumbers" : billNumbers,
                                      "paymentDate" : new Date(),
                                    }
                                  })
                                .exec()
                                .then(data=>{
                                   if(data.nModified == 1){
                                   

                                      // res.status(200).json({message:"Success"});

                                      // ----------------------------------------------to create collection after payment success in package question paper master-----------------------------------------------------------
                                    var allPackages = orderData.packages;
                                    if(allPackages){
                                      // console.log("allPackages--->",allPackages);
                                      var allPackagesLen = allPackages.length;
                                      for(var j=0; j<allPackagesLen; j++){
                                        var packageId = allPackages[j].packageId;
                                        if(packageId){
                                            PackageManagementMaster.findOne({"_id":packageId})
                                                                   .exec()
                                                                   .then(PMMData=>{
                                                                      if(PMMData){
                                                                       
                                                                        var practicePaperIDArray = PMMData.practicePaperID;
                                                                        if(practicePaperIDArray){
                                                                          var practicePaperIDArrayLen = practicePaperIDArray.length;
                                                                          for(var i=0;i<practicePaperIDArrayLen;i++ ){
                                                                            var practicePapId = practicePaperIDArray[i].paperID;
                                                                              if(practicePapId){
                                                                                QuestionPaperMaster.findOne({"_id":practicePapId})
                                                                                                   .exec()
                                                                                                   .then(QuestionPaperMasterData=>{
                                                                                                      if(QuestionPaperMasterData){
                                                                                                        // console.log("QuestionPaperMasterData---PMMData._id->",orderId,PMMData._id);
                                                                                                         PackageQuestionPaperMaster.find({"order_id":orderId,"packageId":PMMData._id})
                                                                                                                                    .exec()
                                                                                                                                    .then(datacount=>{
                                                                                                                                      // console.log("dataCOunt---->",datacount);
                                                                                                                                        var PackageQuestionPaperMasterDataLen = datacount.length;
                                                                                                                                        // console.log("lenghts---------->",PackageQuestionPaperMasterDataLen,practicePaperIDArrayLen);
                                                                                                                                        if(PackageQuestionPaperMasterDataLen<=practicePaperIDArrayLen){
                                                                                                                                          // console.log("sId----->",sId);
                                                                                                                                          StudentMaster.findOne({"studentId":sId})
                                                                                                                                                 .exec()
                                                                                                                                                 .then(studentInfo=>{
                                                                                                                                                  // console.log("packageId for update----->",packageId,PMMData._id);
                                                                                                                                                    var id = new PackageQuestionPaperMaster({
                                                                                                                                                              '_id'              : new mongoose.Types.ObjectId(),
                                                                                                                                                              'order_id'         : orderId,
                                                                                                                                                              'buyerId'          : studentInfo.studentId,
                                                                                                                                                              'packageId'        : PMMData._id,
                                                                                                                                                              'packageName'      : PMMData.packageName,
                                                                                                                                                              'questionPaper_id' : QuestionPaperMasterData._id,
                                                                                                                                                              'questionPaperName': QuestionPaperMasterData.quePaperTitle,
                                                                                                                                                              'franchiseId'      : studentInfo.franchiseId,
                                                                                                                                                              'companyId'        : studentInfo.companyId,
                                                                                                                                                              'studentFullName'  : studentInfo.studentFullName,
                                                                                                                                                              'category'         : studentInfo.category,
                                                                                                                                                              'subCategory'      : studentInfo.subCategory, 
                                                                                                                                                              'createdAt'        : new Date(),                      
                                                                                                                                                            });
                                                                                                                                                     id.save()
                                                                                                                                                         .then(result =>{
                                                                                                                                                          // console.log("result in update",result._id,PMMData.AttemptOfPracticeTest);
                                                                                                                                                           for(var k=0; k<PMMData.AttemptOfPracticeTest;k++){
                                                                                                                                                                PackageQuestionPaperMaster.updateOne({"_id":result._id},
                                                                                                                                                                  {
                                                                                                                                                                    $push:{
                                                                                                                                                                      noOfAttempts:{
                                                                                                                                                                       // 'AtteptCount' : '',
                                                                                                                                                                       'status'      : false,
                                                                                                                                                                       'attemptedAt' : '',
                                                                                                                                                                      }
                                                                                                                                                                    }
                                                                                                                                                                  })
                                                                                                                                                                  .exec()
                                                                                                                                                                  .then(data=>{
                                                                                                                                                                    if(data.nModified == 1){
                                                                                                                                                                          res.status(200).json({message:"Success"});
                                                                                                                                                                          // console.log("in modified---success->")
                                                                                                                                                                        }else{
                                                                                                                                                                          // console.log("in modified---failed->")
                                                                                                                                                                          res.status(200).json({message:"Failed"})
                                                                                                                                                                        }
                                                                                                                                                                  
                                                                                                                                                                  })
                                                                                                                                                                  .catch()
                                                                                                                                                              }

                                                                                                                                                         })
                                                                                                                                                         .catch(err =>{
                                                                                                                                                            console.log(err);
                                                                                                                                                            res.status(500).json({
                                                                                                                                                              error: err
                                                                                                                                                            });
                                                                                                                                                          });

                                                                                                                                                })
                                                                                                                                                 .catch()
                                                                                                                                        }
                                                                                                                                    })
                                                                                                                                    .catch()
                                                                                                      }
                                                                                                   })
                                                                                                   .catch()
                                                                              }
                                                                          }
                                                                        }
                                                                      }
                                                                   })
                                                                   .catch()
                                        }
                                      }
                                    }


                                    // -----------------------------------------------End of code-----------------------------------------


                                    }else{
                                      res.status(200).json({message:"Failed"})
                                       console.log("in modified---success->");

                                    }
                                })
                                .catch()
// // ----------------------------------------------to create collection after payment success in package question paper master-----------------------------------------------------------
//                                     var allPackages = orderData.packages;
//                                     if(allPackages){
//                                       // console.log("allPackages--->",allPackages);
//                                       var allPackagesLen = allPackages.length;
//                                       for(var j=0; j<allPackagesLen; j++){
//                                         var packageId = allPackages[j].packageId;
//                                         if(packageId){
//                                             PackageManagementMaster.findOne({"_id":packageId})
//                                                                    .exec()
//                                                                    .then(PMMData=>{
//                                                                       if(PMMData){
//                                                                         // console.log("PMMData----->",PMMData);
//                                                                         var practicePaperIDArray = PMMData.practicePaperID;
//                                                                         if(practicePaperIDArray){
//                                                                           var practicePaperIDArrayLen = practicePaperIDArray.length;
//                                                                           for(var i=0;i<practicePaperIDArrayLen;i++ ){
//                                                                             var practicePapId = practicePaperIDArray[i].paperID;
//                                                                               if(practicePapId){
//                                                                                 QuestionPaperMaster.findOne({"_id":practicePapId})
//                                                                                                    .exec()
//                                                                                                    .then(QuestionPaperMasterData=>{
//                                                                                                       if(QuestionPaperMasterData){
//                                                                                                         // console.log("QuestionPaperMasterData---PMMData._id->",orderId,PMMData._id);
//                                                                                                          PackageQuestionPaperMaster.find({"order_id":orderId,"packageId":PMMData._id})
//                                                                                                                                     .exec()
//                                                                                                                                     .then(datacount=>{
//                                                                                                                                       // console.log("dataCOunt---->",datacount);
//                                                                                                                                         var PackageQuestionPaperMasterDataLen = datacount.length;
//                                                                                                                                         // console.log("lenghts---------->",PackageQuestionPaperMasterDataLen,practicePaperIDArrayLen);
//                                                                                                                                         if(PackageQuestionPaperMasterDataLen<=practicePaperIDArrayLen){
//                                                                                                                                           // console.log("sId----->",sId);
//                                                                                                                                           StudentMaster.findOne({"studentId":sId})
//                                                                                                                                                  .exec()
//                                                                                                                                                  .then(studentInfo=>{
//                                                                                                                                                   // console.log("studentInfo----->",studentInfo);
//                                                                                                                                                     var id = new PackageQuestionPaperMaster({
//                                                                                                                                                               '_id'              : new mongoose.Types.ObjectId(),
//                                                                                                                                                               'order_id'         : orderId,
//                                                                                                                                                               'buyerId'          : studentInfo.studentId,
//                                                                                                                                                               'packageId'        : packageId,
//                                                                                                                                                               'packageName'      : PMMData.packageName,
//                                                                                                                                                               'questionPaper_id' : QuestionPaperMasterData._id,
//                                                                                                                                                               'questionPaperName': QuestionPaperMasterData.quePaperTitle,
//                                                                                                                                                               'franchiseId'      : studentInfo.franchiseId,
//                                                                                                                                                               'companyId'        : studentInfo.companyId,
//                                                                                                                                                               'studentFullName'  : studentInfo.studentFullName,
//                                                                                                                                                               'category'         : studentInfo.category,
//                                                                                                                                                               'subCategory'      : studentInfo.subCategory, 
//                                                                                                                                                               'createdAt'        : new Date(),                      
//                                                                                                                                                             });
//                                                                                                                                                      id.save()
//                                                                                                                                                          .then(result =>{
//                                                                                                                                                           // console.log("result in update",result._id,PMMData.AttemptOfPracticeTest);
//                                                                                                                                                            for(var k=0; k<PMMData.AttemptOfPracticeTest;k++){
//                                                                                                                                                                 PackageQuestionPaperMaster.updateOne({"_id":result._id},
//                                                                                                                                                                   {
//                                                                                                                                                                     $push:{
//                                                                                                                                                                       noOfAttempts:{
//                                                                                                                                                                        // 'AtteptCount' : '',
//                                                                                                                                                                        'status'      : false,
//                                                                                                                                                                        'attemptedAt' : '',
//                                                                                                                                                                       }
//                                                                                                                                                                     }
//                                                                                                                                                                   })
//                                                                                                                                                                   .exec()
//                                                                                                                                                                   .then(data=>{
//                                                                                                                                                                     // console.log("data update------>",data,orderId);
//                                                                                                                                                                     // PackageOrderMaster.updateOne({"_id":orderId},
//                                                                                                                                                                     //   {
//                                                                                                                                                                     //     $set:{
//                                                                                                                                                                     //       'status':status,
//                                                                                                                                                                     //       'amount':totalAmount,
//                                                                                                                                                                     //       "transactionId" : transid,
//                                                                                                                                                                     //       "billnumbers" : billNumbers,
//                                                                                                                                                                     //       "paymentDate" : new Date(),
//                                                                                                                                                                     //     }
//                                                                                                                                                                     //   })
//                                                                                                                                                                     // .exec()
//                                                                                                                                                                     // .then(data=>{
//                                                                                                                                                                     //    console.log("paid status  update------>",data);
//                                                                                                                                                                     //    if(data.nModified == 1){
//                                                                                                                                                                     //       res.status(200).json({message:"Success"})
//                                                                                                                                                                     //     }else{
//                                                                                                                                                                     //       res.status(200).json({message:"Failed"})
//                                                                                                                                                                     //     }
//                                                                                                                                                                     // })
//                                                                                                                                                                     // .catch()
//                                                                                                                                                                   })
//                                                                                                                                                                   .catch()
//                                                                                                                                                               }

//                                                                                                                                                          })
//                                                                                                                                                          .catch(err =>{
//                                                                                                                                                             console.log(err);
//                                                                                                                                                             res.status(500).json({
//                                                                                                                                                               error: err
//                                                                                                                                                             });
//                                                                                                                                                           });

//                                                                                                                                                 })
//                                                                                                                                                  .catch()
//                                                                                                                                         }
//                                                                                                                                     })
//                                                                                                                                     .catch()
//                                                                                                       }
//                                                                                                    })
//                                                                                                    .catch()
//                                                                               }
//                                                                           }
//                                                                         }
//                                                                       }
//                                                                    })
//                                                                    .catch()
//                                         }
//                                       }
//                                     }


//                                     // -----------------------------------------------End of code-----------------------------------------

                          }
                       })
                       .catch() 

  // PackageOrderMaster.updateOne({"_id":orderId},
  //         {
  //           $set:{
  //             'status':status,
  //             'amount':packageTotal,
  //             "transactionId" : trnsactionId,
  //               "billnumbers" : billNum,
  //               "paymentDate" : new Date(),
  //           }
  //         });


  
}



exports.fetch_package_Receipt = (req,res,next)=>{
    console.log("fetch_package_Receipt",req.params.ID);
    PackageOrderMaster.findOne({_id:req.params.ID})
                            .exec()
                            .then(data=>{
                              if(data){
                               res.status(200).json({data})                              
                              }
                            })
                            .catch(err=>{
                                console.log('err ',err);
                                res.status(500).json({
                                    error: err
                                });
                            });
}

exports.fetch_package_Total = (req,res,next)=>{
    console.log("fetch_package_Total",req.params.ID);
    PackageOrderMaster.findOne({_id:req.params.ID})
                            .exec()
                            .then(data=>{
                              if(data){
                                var packageIdArray=[];
                                console.log("total data---->",data);
                                // var packageIdArray = [{_id:"kq6FGRgiZgdp2HpFi"},{_id:"2u4Sb4XzFZaFFFNE5"}];
                                packageIdArrayLength = (data.packages).length;
                                var dt = data.packages
                                for(var i=0;i<packageIdArrayLength;i++){
                                  packageIdArray.push(dt[i])
                                  
                                }
                                console.log("total packageIdArray---->",packageIdArray.length,packageIdArray);
                                var o = Object.assign({},data);
                                var amount = 0;
                                var priceArray=[];
                                var ln = packageIdArray.length;
                                console.log("ln---->",ln);
                                const cnt= packageIdArray.map((Data,index)=>{
                                  console.log("total packageIdArray---->",Data);
                                   PackageManagementMaster.findOne({_id:Data.packageId})
                                  .exec()
                                  .then((pckgData)=>{
                                    console.log("data next ---->",pckgData);
                                    priceArray.push(pckgData.PackagePrice)
                                    amount += pckgData.PackagePrice;
                                    
                                    if(ln==(index+1)){
                                        res.status(200).json({data:data,message:amount})
                                    }                            

                                  })
                                  .catch()
                                })
                               
                              
                              }
                            })
                            .catch(err=>{
                                console.log('err ',err);
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
  console.log("check_packageorder----------->",req.params.ID);
  PackageOrderMaster.findOne({_id:req.params.ID})
          .exec()
          .then(data =>{
             console.log("check_packageorder----data------->",data);
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
                                packages:{$elemMatch:{packageId:req.params.package_ID}}
                              }
                            )
                      .exec()
                      .then(pom=>{
                        if(pom.length>0){
                          console.log("pom pom",pom,req.params.Order_ID,req.params.package_ID)
                          PackageOrderMaster.updateOne(
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
                          console.log("in else---->")
                          PackageManagementMaster .findOne({_id:req.params.package_ID})
                                                  .exec()
                                                  .then(pmm=>{
                                                    if(pmm){
                                                      console.log("pmm push----->",pmm,req.params.package_ID);
                                                      PackageOrderMaster.updateOne(
                                                                            {_id:req.params.Order_ID},
                                                                            {
                                                                              $push:{
                                                                                  "packages":{
                                                                                    'packageId'   : req.params.package_ID, 
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
                                                                          console.log("pom update--->",pom)
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
    StudentMaster.findOne({studentId:req.params.student_ID})
                 .exec()
                 .then(sm=>{
                    if(sm){
                      PackageManagementMaster .findOne({_id:req.params.package_ID})
                                              .exec()
                                              .then(pmm=>{
                                                if(pmm){
                                                  console.log("req.params.package_ID insert",req.params.package_ID,pmm)
                                                  var invoiceNum = PackageOrderMaster.find({})
                                                                                     .exec()
                                                                                     .then(cntData=>{
                                                                                      console.log("cntData---pmm-->",pmm);
                                                                                      console.log("cntData---cntData-->",req.params.package_ID);
                                                                                      var invoiceNum = 0;
                                                                                        if(cntData){
                                                                                          invoiceNum = cntData.length +1;
                                                                                        }

                                                                                        if(invoiceNum){
                                                                                          console.log("sm---invoiceNum--------->",sm,pmm)
                                                                                          var packageOrderMaster = new PackageOrderMaster({
                                                                                                                  '_id'           : new mongoose.Types.ObjectId(),
                                                                                                                  'buyerId'       : req.params.student_ID,
                                                                                                                  'studentName'   : sm.studentFullName,
                                                                                                                  'franchiseId'   : sm.franchiseId,
                                                                                                                  'status'        : 'unPaid',
                                                                                                                  'packages'      : [{
                                                                                                                                        'packageId'   : req.params.package_ID, 
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
                                                                                                            // .exec()
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







                                                                                     })
                                                                                     .catch()
                                                  /*var invoiceNum = PackageOrderMaster.find({}).count() + 1;

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
                                                  }*/
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