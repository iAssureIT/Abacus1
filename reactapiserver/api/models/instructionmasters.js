const mongoose = require('mongoose');

const instructionmastersSchema = mongoose.Schema({
    _id : String,
    instructionFor : String,
    instruction : String,
    createdAt : Date,
});

module.exports = mongoose.model('instructionmasters',instructionmastersSchema);

