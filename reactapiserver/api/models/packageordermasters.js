const mongoose = require('mongoose');

const packageordermastersSchema = mongoose.Schema({
    _id : String,
    buyerId : String,
    studentName : String,
    franchiseId : String,
    status : String,
    packages : [ 
        {
            packageId : String,
            packageName : String,
            category : String,
            subCategory : String,
            packagePrice : Number,
            NoOfPracticeTest : Number
        }
    ],
    invoiceId : Number,
    packageStatus : String,
    amount : Number,
    transactionId : String,
    billnumbers : Number,
    paymentDate : Date
});

module.exports = mongoose.model('packageordermasters',packageordermastersSchema);

