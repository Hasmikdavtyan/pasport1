const User = require('../models/userSchema')
let {activUsers}= require('./appController')

class auth {
    registerViewPage(req, res) {
     let message = ''
     res.render('components/register.ejs', {message: message});
    }

    loginViewPage(req, res) {
        let message = ''
        res.render('components/login.ejs', {message: message});
       }

// register new user if not exist
    async registerNewUser(req, res){
       async  function createNewUser(username,email, password){
            return new User({
                username:username,
                email:email,
                password:password
            }).save()    
        }
   try {
    if(!req.body.username ||!req.body.email ||!req.body.password){
       let  message = 'please fill all fieldes'
        res.render('components/register.ejs', {message:message})
    }else{
        ( async()=>{
            let user = await User.findOne({email:req.body.email}).catch(err =>{throw err} )
            if(!user){
            await createNewUser( req.body.username, req.body.email, req.body.password).then(result=>{
                return  res.redirect('/login')
              }).catch(err =>{throw err} )
          }else{
            let message = 'this email was used by another user'
            res.render('components/register.ejs',  {message:message })
          }
        })()
    }
   }catch(e) {
      throw e}
}

 loginNewUser(req,res){

     res.redirect('/app')
 }

 async logOut(req, res){

     if(req.user) {
         
   let index =  await  activUsers.findIndex(el=>el.id===req.user.id)
        activUsers.splice(index, 1)
        console.log(activUsers)
         req.logout()
        req.session.destroy()
        res.clearCookie('connect.sid') // clean up!
        res.redirect('/')
     }
    
    
    
 }
 }
 
 module.exports = new auth()