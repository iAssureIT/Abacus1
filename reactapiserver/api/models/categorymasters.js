const mongoose = require('mongoose');

const categorymastersSchema = mongoose.Schema({
    _id : String,
    categoryName : String,
    NoofQuestion : String,
    categoryMarks : String,
    levels : [ 
        {
            type:Map, of: String
        }
    ]
});

module.exports = mongoose.model('categorymasters',categorymastersSchema);

