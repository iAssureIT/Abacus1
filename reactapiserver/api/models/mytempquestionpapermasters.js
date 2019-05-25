const mongoose = require('mongoose');

const mytempquestionpapermastersSchema = mongoose.Schema({
    _id : String,
    examPaperId : String,
    studentId : String,
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
            questionNumber : Number,
            questionId : String,
            question : String,
            A : String,
            B : String,
            C : String,
            D : String,
            correctAnswer : String
        }
    ]
});

module.exports = mongoose.model('mytempquestionpapermasters',mytempquestionpapermastersSchema);

