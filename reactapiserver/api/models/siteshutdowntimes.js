const mongoose = require('mongoose');

const siteshutdowntimesSchema = mongoose.Schema({
    _id : String,
    startTime           : Date,
    endTime             : Date,	
    text    	        : String,
    createdAt           : Date,
});

module.exports = mongoose.model('siteshutdowntimes',siteshutdowntimesSchema);

