var express = require('express');
var router = express.Router();
const {registerNewUser, loginNewUser,registerViewPage, loginViewPage, logOut} = require('../controllers/loginRegisterController')
const {validateRegister, validateLogin, }= require('../midleware/validate')
const passport = require('passport')
/*  */


router.route('/register')
.get(registerViewPage)
.post( validateRegister, registerNewUser)


router.route('/login')
.get(loginViewPage)
.post( passport.authenticate('local', {
 // successRedirect:'/app',
  failureRedirect:'/login',
  //failureFlash: 'Invalid username or password.'
}), loginNewUser) //validateLogin, )

router.get('/logout', logOut)


module.exports = router;
