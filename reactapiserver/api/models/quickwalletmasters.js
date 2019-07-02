const mongoose = require('mongoose');

const quickwalletmastersSchema = mongoose.Schema({
    _id                 : String,
    quikWalletId        : Number,
    environment         : String,
    prodKey             : String,
    prodSecret          : String,
    sandboxKey          : String,
    sandboxSecret       : String,
    user                : String,
    createdAt           : Date,
    prodAPI             : String,
    sandboxAPI          : String,
    updatedAt           : Date
});

module.exports = mongoose.model('quickwalletmasters',quickwalletmastersSchema);

