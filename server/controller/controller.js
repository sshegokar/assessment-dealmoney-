
const userService = require('../services/service')




module.exports.exportFile = (req, res) => {
    try {
        var response = {}
        userService.exportFileData(req, (err, data) => {
            if (err) {
                response.status = false
                response.error = err
                return res.status(500).send({ response })
            } else {
                response.status = true
                response.data = data
                return res.status(200).send({ response })
            }
        })
    } catch (err) {
        console.log(err)
    }
},

module.exports.uploadBulk = (req, res) => {
    try {
        userService.uploadBulk(req, res, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send(data)
            }
        })

        // }
    } catch (err) {
        console.log(err)
    }
}

