const mongoose = require('mongoose');

const tempimagesSchema = mongoose.Schema({
    _id : String,
    userId : String,
    imagePath : String
});

module.exports = mongoose.model('tempimages',tempimagesSchema);

