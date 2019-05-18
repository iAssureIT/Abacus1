const mongoose = require('mongoose');

const accessmanagementSchema = mongoose.Schema({
    _id : String,
    moduleName : String,
    facilities : [ 
        {
            facilityName : String
        }
    ],
    createdAt : Date
});

module.exports = mongoose.model('accessmanagementmasters',accessmanagementSchema);
// module.exports = mongoose.model('users',userSchema);

