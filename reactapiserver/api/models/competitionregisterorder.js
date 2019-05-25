const mongoose = require('mongoose');

const competitionregisterorderSchema = mongoose.Schema({
    _id : String,
    competitionId : String,
    competitionName : String,
    studentFullName : String,
    studentId : String,
    category : String,
    subCategory : String,
    franchiseId : String,
    franchiseName : String,
    competitionOriginalFees : String,
    competitionFees : Number,
    franchiseShare : Number,
    status : String,
    transactionId : Number,
    billnumbers : Number,
    paymentMode : String,
    paymentDate : Date
});

module.exports = mongoose.model('competitionregisterorders',competitionregisterorderSchema);

