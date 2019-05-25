const mongoose = require('mongoose');

const usersessioncollectionsSchema = mongoose.Schema({
    _id : String,
    key : String,
    value : Number,
    userId : String
});

module.exports = mongoose.model('usersessioncollections',usersessioncollectionsSchema);

