var userService = require('../services/service')
module.exports.uploadBulk = (file, res) => {
    try {
        userService.uploadBulk(file, (err, data) => {
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