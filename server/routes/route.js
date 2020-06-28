const express = require('express')
const router = express.Router();
const cntuser = require('../controller/controller')



router.get('/exportFile',cntuser.exportFile);
router.post('/uploadFile', cntuser.uploadBulk);


module.exports = router;
