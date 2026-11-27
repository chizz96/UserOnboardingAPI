const jwt = require('jsonwebtoken')

const userModel = require('../controllers/userAuthController')

exports.authenticate = async(req, res, next)=>{
    try{
        const auth = req.header.authorization
        if(!auth){
            return res.status(401).json({
                message:'Autho not found'
            })
        }

        const token = auth.split(' ')[1]

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decodedToken._id)

        
        if(!user){
            return res.status(404).json({message:`Auth failed: User not found`})
        }

        req.user = decodedToken

        next()

    }catch(error){
        return res.status(500).json({
            error:error.message
          })
    }
}