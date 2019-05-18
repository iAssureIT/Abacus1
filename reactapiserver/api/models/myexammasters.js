const mongoose = require('mongoose');

const myexammastersSchema = mongoose.Schema({
    _id : String,
    StudentId : String,
    companyId : Number,
    franchise_id : String,
    firstName : String,
    lastName : String,
    fullName : String,
    studImg : String,
    competitionId : String,
    competitionName : String,
    examDate : Date,
    examDateFormat : Date,
    category : String,
    subCategory : String,
    paperName : String,
    examTime : String,
    examSolvingTime : Strign,
    examSolvedTime : String,
    paperTitle : String,
    examType : String,
    examFees : String,
    totalMarks : String,
    marksPerQuestion : String,
    totalQuestion : Number,
    attemptedQues : Number,
    correctAnswer : Number,
    wrongAnswer : Number,
    totalScore : Number,
    createdAt : Date,
    status : String,
    examStatus : String,
    answerArray : [ 
        {
            questionNumber : Number,
            questionId : String,
            question : String,
            A : String,
            B : String,
            C : String,
            D : String,
            correctAnswer : String,
            attempted : String,
            studentAnswer : String,
            answer : String,
            dummyId : String,
            indicatorClass : String
        }
    ],
    studentImageArray : [ 
        {
            studentImage : String
        }
    ]
});

module.exports = mongoose.model('myexammasters',myexammastersSchema);

