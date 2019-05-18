const mongoose = require('mongoose');

const accesspermissionmanagementsSchema = mongoose.Schema({
    _id			                : String,
    moduleName                  : String,
    moduleId                    : String,
    facilityName                : String,
    facilityPermission          : String,
    moduleFacilityPermission : [ 
        {
            type:Map, of: String
        }
    ],
    "createdAt" : Date
});

module.exports = mongoose.model('accesspermissionmanagements',packageSchema);

