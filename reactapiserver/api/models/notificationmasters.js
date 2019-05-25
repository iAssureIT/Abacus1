const mongoose = require('mongoose');

const notificationmastersSchema = mongoose.Schema({
    _id : String,
    subject : String,
    content : String,
    status : String,
    createdAt: Date
});

module.exports = mongoose.model('notificationmasters',notificationmastersSchema);

