const mongoose = require('mongoose');

const exammastersSchema = mongoose.Schema({
    _id : String,
    competitionName : String,
    competitionDate : String,
    startTime : String,
    endTime : String,
    competitionFees : String,
    franchiseShare : String,
    maatsShare : Number,
    termsCondition : String,
    createdAt : Date,
    competitionStatus : String,
    competitionExams : [ 
        {
            questionPaperId : String,
            category : String,
            subCategory : String,
            paperTitle : String,
            examDuration : String,
            totalMarks : String,
            marksPerQuestion : String,
            examStatus : String
        }
    ],
    competitionView : String
});

module.exports = mongoose.model('exammasters',exammastersSchema);

