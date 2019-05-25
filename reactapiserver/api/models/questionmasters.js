const mongoose = require('mongoose');

const questionmastersSchema = mongoose.Schema({
    _id : String,
    categoryName : String,
    subCategory : String,
    question : String,
    A : String,
    B : String,
    C : String,
    D : String,
    correctAnswer : String,
    createdAt : Date
});

module.exports = mongoose.model('questionmasters',questionmastersSchema);

