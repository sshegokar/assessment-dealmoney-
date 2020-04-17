
//require the usermodel
var user = require('../model/usermodel')

/**
 *@description:To store new user data and check it is an existed user or not 
 */
exports.register = (body, callback) => {
    try {
        user.find({ 'email': body.email }, (err, data) => {
            if (err) {
                return callback(err);
            } else if (data.length > 0) {
                var response = { "error": true, "message": "Email already exists ", "errorCode": 404 };
                return callback(response);
            } else {
                const newUser = new user({
                    "firstname": body.firstname,
                    "lastname": body.lastname,
                    "email": body.email,
                    "nationality": body.nationality,
                    "mobileNumber": body.mobileNumber
                });
                newUser.save((err, result) => { //save the user in database
                    if (err) {
                        return callback(err);
                    } else {
                        callback(null, result);
                    }
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
}
exports.uploadFile = (req, callback) => {
    try {
        if (!req.file.originalname) {
            callback('File Name not found')
        }
        if (!req.decoded.fbId || !req.decode.googleId) {
            callback('User id not found')
        }
        let image = req.file.originalname ? req.file.originalname : req.file.originalname;
        let fbId = req.decoded.fbId ? req.decoded.fbId : req.decoded.fbId;
        let googleId = req.decode.googleId ? req.decode.googleId : req.decode.googleId;
        if (image != null) {
            var newimage = image;
        } else {
            callback('File Not Found')
        }
        if (fbId) {
            user.findOneAndUpdate({ fbId: fbId }, { $set: { profileurl: req.file.location } },
                (err, result) => {
                    if (err) {
                        callback(err)
                    } else {
                        return callback(null, req.file.location)
                    }
                });
        }
        if (googleId) {
            user.findOneAndUpdate({ googleId: googleId }, { $set: { profileurl: req.file.location } },
                (err, result) => {
                    if (err) {
                        callback(err)
                    } else {
                        return callback(null, req.file.location)
                    }
                });
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 *@description:Social Login with facebook
 *@purpose :login with facebook and store the user data in database 
 */

exports.fbOauth = (req, callback) => {
    try {
        user.find({ fbID: req.profile.id }, (err, data) => {

            if (err) {
                return callback(err);
            } else {
                const newUser = new user({
                    fbID: req.profile.id,
                    fbUsername: req.profile.username,
                    email: req.profile.emails[0].value,
                    access_token: req.accessToken,
                    "firstname": " ",
                    "lastname": " ",
                    "fbverify": "false",
                    "profileurl": req.profile.photos[0].value
                });

                newUser.save((err, result) => { //save the user in database
                    if (err) {
                        return callback(err);
                    } else {
                        return callback(null, result);
                    }
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
}
/**
 *@description:Social Login with google
 *@purpose :login with google and store the user data in database 
 */

exports.googleOauth = (req, callback) => {
    try {
        user.find({ googleId: req.profile.id }, (err, data) => {

            if (err) {
                return callback(err);
            } else {
                const newUser = new user({
                    googleId: req.profile.id,
                    Username: req.profile.username,
                    email: req.profile.emails[0].value,
                    access_token: req.accessToken,
                    "firstname": " ",
                    "lastname": "",
                    "googleVerify": "false",
                    "profileurl": req.profile.photos[0].value
                });

                newUser.save((err, result) => { //save the user in database
                    if (err) {
                        return callback(err);
                    } else {
                        return callback(null, result);
                    }
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
}
/**
 *@description:to verify fbuser using the user access_token and grant user to secure access delegation 
 */
exports.fbVerify = (req, callback) => {

    try {
        console.log(req.decoded.id)
        // updateOne() Updates a single document within the collection based on the filter.
        user.updateOne({ _id: req.decoded.id }, { fbVerify: true }, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        console.log(err);
    }
}
/**
 *@description:to verify google user using the user access_token and grant user to secure access delegation 
 */
exports.googleVerify = (req, callback) => {

    try {
        console.log(req.decoded.id)
        // updateOne() Updates a single document within the collection based on the filter.
        user.updateOne({ _id: req.decoded.id }, { googleVerify: true }, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getUserInfo = (userId, callback) => {

    try {
        user.findOne({ _id: userId }, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    } catch (err) {
        console.log(err);
    }
}




