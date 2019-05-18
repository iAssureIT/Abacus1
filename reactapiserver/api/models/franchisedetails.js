const mongoose = require('mongoose');

const franchisedetailsSchema = mongoose.Schema({
    _id : String,
    companyId : Number,
    franchiseCodeForCompanyId : String,
    franchiseName : String,
    firstName : String,
    middleName : String,
    lastName : String,
    contactNo : String,
    alternateContactNo : String,
    mail : String,
    franchisePhoto : String,
    createdBy : String,
    createdAt : Date,
    franchiseLocations : [ 
        {
            mainLocation : String,
            addressLine1 : String,
            addressLine2 : String,
            city : String,
            pincode : String,
            State : String,
            country : String
        }
    ],
    bankDetails : [ 
        {
            accHolderName : String,
            accNickName : String,
            accType : String,
            bankName : String,
            branchName : String,
            accNumber : String,
            ifscCode : String
        }
    ],
    Documents : [ 
        {
            DocumentType : String,
            ImgSource : String
        }
    ],
    verificationStatus : String
});

module.exports = mongoose.model('franchisedetails',franchisedetailsSchema);

