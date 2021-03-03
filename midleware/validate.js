const joi = require('@hapi/joi')

class Validate  {



 validateRegister (req, res, next ){
    const schema = joi.object({
        username:joi.string().min(5).max(255).required(),
        email:joi.string().min(5).max(255).required().email(),
        password:joi.string().min(5).max(255).required(),
    })
  
    const {error}=schema.validate(req.body)
    if(error) return res.status(400).json({error:error.details[0].message})
        next()
    }

    validateLogin (req, res, next ){
        const schema = joi.object({
            username:joi.string().min(3).max(255).required(),
            email:joi.string().min(5).max(255).required().email(),
            password:joi.string().min(5).max(255).required(),
        })
      
   
     const {error}=schema.validate(req.body)
        if(error) return res.status(400).json({error:error.details[0].message})
        next()
    }

}

module.exports = new Validate()


