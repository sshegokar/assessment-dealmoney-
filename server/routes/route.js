const express = require('express')
const router = express.Router();
const cntuser = require('../controller/controller')
const upload = require('../controller/file-upload-controller')
const middle = require('../authentication/index')



router.put('/exportFile',cntuser.exportFile);
router.post('/uploadFile', upload.uploadBulk);


module.exports = router;
