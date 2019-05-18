const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    _id			    : String,
    packageName     : String,
    categoryName    : String,
    subCategory     : String,
    NoOfPracticeTest : Number,
    AttemptOfPracticeTest : String,
    PackagePrice : Number,
    practicePaperID : [ 
            {
                paperID : String
            }
        ],
    Description : String,
    createdAt : Date,
    packageStatus : String

});

module.exports = mongoose.model('packageManagementMaster',packageSchema);
