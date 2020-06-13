const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes/route')
const mongodb = require('./mongodb')
const session = require('express-session')
// redis = require('redis')
// client = redis.createClient()
require('dotenv').config()
var route = express.Router();
// var r = require('../client')

const app = express()
var expressValidator = require('express-validator')
app.use(expressValidator())

/// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use('/', router);
app.use(express.static(__dirname+'./client'));


// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to World of Program" });
});

app.use(session({
    secret: 'welcome',
    resave: true,
    saveUninitialized: true
}))

// listen for requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})

app.use(bodyParser.urlencoded({ extended: true }))




module.exports = app
