
// import the express and controller function
var userService = require('../services/service')
var jwt = require('jsonwebtoken')
var gentoken = require('../middleware/token');
var async = require('async')
/**
 *@description: To handle the registration of new user.
 *             request from client and response from server.
 */
module.exports.register = (req, res) => {
    try {
        req.checkBody('firstname', 'Firstname is not valid').isLength({ min: 3 }).isAlpha()
        req.checkBody('lastname', 'Lastname is not valid').isLength({ min: 3 }).isAlpha()
        req.checkBody('email', 'Email is not valid').isEmail()
        var errors = req.validationErrors()
        var response = {}
        if (errors) {
            response.success = false

            response.error = errors
            return res.status(422).send(response)
        } else {
            var rsp = {}
            const tasks = [
                function registerUser(callback) {
                    userService.register(req.body, (err, data) => {
                        if (err) {
                            return callback(err)
                        } else {
                            rsp = data
                            return callback(null, data)
                        }
                    })
                },
            ]
            async.series(tasks, (err, results) => {
                if (err) {
                    return (err)
                } else {
                    return res.json(results)
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}
exports.uploadFile = (req, res) => {
    try {
        userService.uploadFile(req, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send(data)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

exports.getUserInfo = (userId, res) => {
    try {
        userService.getUserInfo(userId, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send(data)
            }
        })
    } catch (err) {
        console.log(err)
    }
}



