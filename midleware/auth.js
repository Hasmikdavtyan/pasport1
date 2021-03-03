const passport = require('passport')
const passportLocal = require('passport-local').Strategy

const User = require('../models/userSchema')

passport.use(new passportLocal({
   usernameField: 'email',
},async function(username, password, done) {
   User.findOne({ email: username }, async function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      let passOk = await user.comparePass(password)
      if (!passOk) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
   });
 }
));


passport.serializeUser(function(user, done) {
  
   done(null, user.id);
 });

passport.deserializeUser( async (id, done)=>{
   try{

      User.findById(id, function(err, user) {
         done(err, user);
       });
   }catch(e){
      return done(e)
   }
    
})
 module.exports={
     initialize:passport.initialize(),
     session: passport.session()
 }