const mongoose = require('mongoose');

const mypracticeexammastersSchema = mongoose.Schema({
    // _id : mongoose.Schema.Types.ObjectId,
    _id : String,
    StudentId : String,
    examPaperId : String,
    originalTime : String,
    examTime : String,
    examName : String,
    category : String,
    marksPerQues : String,
    totalQuestion : Number,
    examType : String,
    totalMarks : String,
    attemptedQues : Number,
    correctAnswer : Number,
    wrongAnswer : Number,
    totalScore : Number,
    createdAt : Date,
    date : String,
    examStatus : String,
    lastVisitedQuestion : String,
    lastVisitedQAnswer : String,
    answerArray : [ 
        {
            questionId          : String,
            question            : String,
            A                   : String,
            B                   : String,
            C                   : String,
            D                   : String,
            correctAnswer       : String,
            attempted           : String,
            questionNumber      : String,
            studentAnswer       : String,
            answer              : String,
            dummyId             : String,
            indicatorClass      : String
        }
    ]
});

module.exports = mongoose.model('mypracticeexammasters',mypracticeexammastersSchema);

