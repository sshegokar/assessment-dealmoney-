const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes/route')
const mongodb = require('./mongodb')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()
var route = express.Router();


const app = express()
var expressValidator = require('express-validator')
app.use(expressValidator())

app.use(cors())
app.use(bodyParser.json({limit: '150mb'}))
app.use('/', router);
app.use(express.static(__dirname+'./client'));


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

app.use(bodyParser.urlencoded({limit: '150mb', extended: true}))




module.exports = app
