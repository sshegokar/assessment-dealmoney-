const express = require('express')
const router = express.Router();
const cntuser = require('../controller/controller')
const middle = require('../authentication/index')
const upload = require('../services/fileupload')
const passport = require('passport')
router.post('/register', cntuser.register);
router.get('/getUser', cntuser.getUserInfo);

router.post('/uploadFile', upload.single('image'), middle.checkToken, cntuser.uploadFile);

router.route('/auth/facebook')
  .post(passport.authenticate('facebookToken', { session: false }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('http://localhost:4200/add-user');
  });
router.post('/fbVerify/:token', middle.checkToken, cntuser.fbVerify)

app.get('/login', passport.authenticate('google'));
router.get('/login', passport.authenticate('google'));
app.get('/auth/callback/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('http://localhost:4200/add-user');
  }
);
router.post('/googleVerify/:token', middle.checkToken, cntuser.googleVerify)


module.exports = router;
