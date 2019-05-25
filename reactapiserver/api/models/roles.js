const mongoose = require('mongoose');

const rolesSchema = mongoose.Schema({
    _id : String,
    name : String
});

module.exports = mongoose.model('roles',rolesSchema);

