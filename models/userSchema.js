const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { use } = require('../routes')

const Salt = 11

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true, 'username is required']
    },

    email:{
        type: String,
        required:[true, 'email is required'],
        lowercase: true,
        unique:true

    },
    password:{
        type: String,
        required:[true, 'password is required'],
        trim:true,

    },
},{timestamps:true})


userSchema.pre('save', async function SavePass(next){
  const  user = this
  try {
    if(!user.isModified('password')) next()
    bcrypt.hash(user.password, Salt).then(res=> {
        user.password= hash
        next();
    })
       
   
  } catch(err) { 
      next(err);
  }
})

userSchema.methods.comparePass = async function comparePass(reqPass){
   return await bcrypt.compare(reqPass, this.password)
}





module.exports = mongoose.model('user',userSchema)