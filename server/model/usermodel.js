
const mongoose = require('mongoose');

// create instance of Schema
var mongoSchema = mongoose.Schema;
var userSchema = new mongoSchema({
    "ts": { type: String },
    "val": { type: String }
}, {
    timestamps: true
});


var user = mongoose.model('user', userSchema);
module.exports = mongoose.model('user', userSchema)
