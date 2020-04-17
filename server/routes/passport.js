const express = require('express')
const router = express.Router()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
var jwt = require('jsonwebtoken')
const service = require('../services/service')
GoogleStrategy = require('passport-google-auth').Strategy;


/**
 *@description:Social login for google Account using passport strategies.  
 */
passport.use(new GoogleOAuth2Strategy({
    clientId: process.env.googleAuth.clientID,
    clientSecret: process.env.googleAuth.clientSecret,
    callbackURL: process.env.googleAuth.profileURL
},
    function (accessToken, refreshToken, profile, done) {
        var req = { accessToken, refreshToken, profile }
        service.googleOauth(req, (err, data) => {
            if (err) {
                done(err)
            } else {
                var token = jwt.sign({ id: data.id }, process.env.googleAuth.clientSecret, { expiresIn: 86400000 })
                done(JSON.stringify(token))
            }
        })
    }
));


/**
 *@description:Social login for Facebook Account using passport strategies.  
 */
passport.use(new FacebookStrategy({
    clientID: process.env.facebookAuth.clientID,
    clientSecret: process.env.facebookAuth.clientSecret,
    callbackURL: process.env.facebookAuth.profileURL,
    scope: 'profileURL'
},
    function (accessToken, refreshToken, profile, done) {
        var req = { accessToken, refreshToken, profile }
        service.googleOauth(req, (err, data) => {
            if (err) {
                done(err)
            } else {
                var token = jwt.sign({ id: data.id }, process.env.facebookAuth.clientSecret, { expiresIn: 86400000 })
                done(JSON.stringify(token))
            }
        })
    }))
module.exports = router
