const mongoose = require('mongoose');

const questionpapermastersSchema = mongoose.Schema({
    _id : String,
    examType : String,
    quePaperTitle : String,
    category : String,
    subCategory : String,
    noOfQuestion : String,
    marksPerQues : String,
    totalMarks : String,
    examTime : String,
    createdAt : Date,
    questionsArray : [ 
        {
            questionId : String,
            question : String,
            A : String,
            B : String,
            C : String,
            D : String,
            correctAnswer : String
        }
    ],
    paperStatus : String,
    status : String,
    isDraft : String
});

module.exports = mongoose.model('questionpapermasters',questionpapermastersSchema);

