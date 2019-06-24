const mongoose = require('mongoose');

const packagequestionpapermastersSchema = mongoose.Schema({
    _id                     : String,
    order_id                : String,
    buyerId                 : String,
    packageId               : String,
    packageName             : String,
    questionPaper_id        : String,
    questionPaperName       : String,
    franchiseId             : String,
    companyId               : Number,
    studentFullName         : String,
    category                : String,
    subCategory             : String,
    createdAt               : Date,
    noOfAttempts            : [ 
                                {
                                    status : Boolean,
                                    attemptedAt : String
                                }
                              ]
});

module.exports = mongoose.model('packagequestionpapermasters',packagequestionpapermastersSchema);

