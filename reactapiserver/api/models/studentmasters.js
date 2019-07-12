const mongoose = require('mongoose');

const studentmastersSchema = mongoose.Schema({
    _id : String,
    studentId : String,
    studentFirstName : String,
    studentMiddleName : String,
    studentLastName : String,
    studentFullName : String,
    mobileNumber : String,
    studentDOB : String,
    studentAge : Number,
    schoolName : String,
    franchiseName : String,
    franchiseMobileNumber : String,
    teacherName : String,
    studentAddress : String,
    studentCountry : String,
    studentState : String,
    studentCity : String,
    pincode : String,
    category : String,
    subCategory : String,
    studentEmail : String,
    genderType : String,
    status : String,
    createdAt : Date,
    imgSrc : String,
    updateProfilePermission: String,
    profileEditStatus:String,
    franchiseId: String,
    companyId: String,
    examStatus : String,
    examFee : Number,
    downTimeStatus : String,
    categoryArray : [{
        category         : String,
        subCategory    : String,
        examStatus     : String,
        status         : String,
        createdAt      : Date
    }]
});

module.exports = mongoose.model('studentmasters',studentmastersSchema);

