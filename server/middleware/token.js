const jwt = require('jsonwebtoken');
module.exports = {
    GenerateTokenFacebook(payload) {
        const token = jwt.sign({ payload }, process.env.facebookAuth.SECRETKEY, { expiresIn: '2h' }) //expires in two hours
        const obj = {
            success: true,
            message: 'Token Generated !!',
            token: token
        }
        return obj;
    }
}

module.exports = {

    GenerateTokenGoogle(payload) {
        const token = jwt.sign({ payload }, process.env.googleAuth.SECRETKEY, { expiresIn: '2h' }) //expires in two hours
        const obj = {
            success: true,
            message: 'Token Generated !!',
            token: token
        }
        return obj;
    }
}

