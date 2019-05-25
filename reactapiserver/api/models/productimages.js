const mongoose = require('mongoose');

const productimagesSchema = mongoose.Schema({
    _id : String,
    Size : Number,
    type : String,
    name : String,
    meta : {
        userId : String
    },
    ext : String,
    extension : String,
    extensionWithDot : String,
    mime : String,
    // mime-type : String,
    userId : String,
    path : String,
    versions : {
        original : {
            path : String,
            size : Number,
            type : String,
            extension : String,
            meta : {
                pipePath : String
            }
        }
    },
    _downloadRoute : String,
    _collectionName : String,
    isVideo : Boolean,
    isAudio : Boolean,
    isImage : Boolean,
    isText : Boolean,
    isJSON : Boolean,
    isPDF : Boolean,
    _storagePath : String,
    public : Boolean
});

module.exports = mongoose.model('productimages',productimagesSchema);

