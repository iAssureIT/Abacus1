const mongoose = require('mongoose');

const projectsettingsSchema = mongoose.Schema({
    _id : String,
    key : String,
    secret : String,
    bucket : String,
    region : String,
    type : String
});

module.exports = mongoose.model('projectsettings',projectsettingsSchema);

