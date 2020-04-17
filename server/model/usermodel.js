//import the mongoose and bcrypt module
const mongoose = require('mongoose');

// create instance of Schema
var mongoSchema = mongoose.Schema;
var userSchema = new mongoSchema({
    "firstname": { type: String },
    "lastname": { type: String },
    "email": { type: String },
    "nationality": { type: String },
    "mobileNumber": { type: Boolean },
    "fbverify": { type: Boolean },
    "userID": { type: String },
    "aadharCardUrl": { type: String },
    "access_token": { type: String },
    "profileurl": { type: String },
    "googleverify": { type: Boolean }

}, {
    timestamps: true
});


var user = mongoose.model('user', userSchema);
module.exports = mongoose.model('user', userSchema)
