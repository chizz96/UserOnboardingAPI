const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/email')
const otp_generate = require('otp-generator')
const jwt = require('jsonwebtoken')


exports.register = async(req, res)=>{
    try{
        const { firstName, lastName, email, password, confirmPassword } = req.body
        const user = await userModel.fineOne({email:email.toLowerCase()})

        if(user){
            return res.status(400).json({message:`User with Email: ${email} already exist`})
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                message:"confirm password does not match"
            })
        }

        const saltRounds = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const otp = otp_generate(6,{lowerCaseAlphabet: false, upperCaseAlphabet:false, specialChars:false});

        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const data = {
            firstName,
            lastName,
            email:email.toLowerCase(),
            password:hashPassword,
            otp,
            otpExpiry
        };

        const newUser = await userModel.create(data);

        const emailContent = {
            subject:"Email Verification",
            firstName:newUser.firstName,
            lastName:newUser.lastName,
            email:newUser.email,
            htmlContent:`<html><head></head><body><p>Hello,${newUser.firstName} ${newUser.lastName}</p><p>we are thrilled to have you onboard please use the otp below to verify your account, <br> ${otp} </p></body></html>`
        };

        await sendEmail(emailContent)

        const userResponse = {
            firstName:newUser.firstName,
            lastName:newUser.lastName,
            email:newUser.email
        }

        return res.status(201).json({
            message:"User successfully register", user:userResponse
        })


    }catch(error){
        return res.status(500).json({
            error:error.message
          })
    }
}


exports.verifyEmail = async(req, res)=>{
    try{
        const { email, otp } = req.body
        const date = new Date()
        const user = await userModel.findOne({email:email.toLowerCase()})

        if(!user){
            return res.status(404).json({message:`User not found`})
        }

        if(user.otp != otp){
            return res.status(400).json({message:`invalid Otp`})
        }

        if (user.otpExpiry < date){
             return res.status(400).json({message:"Otp  has expired"})
        }

        user.isVerified = true,
        user.otp = null

        await user.save()
        return res.status(200).json({message:`Account verified successfull`})

    }catch(error){
        return res.status(500).json({
            error:error.message
          })
    }
}


exports.login = async(req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email.toLowerCase() })

        if(!user){
            return res.status(404).json({
                message:'User not found'
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)
        if (isPassword == false){
            return res.status(400).json({
                message:'invalid email or password'
            })
        }

        if(user.isVerified == false){
            return res.status(400).json({
                message:'User not verified', data: user
            })
        }

        const userResponse = {
            firstName:newUser.firstName,
            lastName:newUser.lastName,
            email:newUser.email
        }

        const token = await jwt.sign({id:user._id, email:email}, process.env.JWT_SECRET,{expiresIn: "30 minutes"})
        res.status(200).json({
            message:'logan successful', data: userResponse, token 
        })


    }catch(error){
        return res.status(500).json({
            error:error.message
          })
    }
}


exports.forgotPassword = async(req, res)=>{
    try{
        const { email } = req.body
        const user = await userModel.fineOne({email:email.toLowerCase()})

        if(!user){
            return res.status(404).json({message:`User not found`})
        }

        const otp = otp_generate(6, {lowerCaseAlphabet: false, upperCaseAlphabet:false, specialChars:false})

        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const emailContent={
            subject: 'Password Reset',
            firstName:newUser.firstName,
            lastName:newUser.lastName,
            email:newUser.email,
            htmlContent:`<html><head></head><body><p>Hello,${newUser.firstName} ${newUser.lastName}</p><p> We received a request to reset your password, use this otp to reset your password <br>${otp}</p>The otp will expire in 10 minutes<p></p></body></html>`

        }

        user.otp = otp 
        user.otpExpiry = otpExpiry
        await sendEmail(emailContent)
        await user.save()

        return res.status(200).json({message:"succefully forgot password"})

    }catch(error){
        return res.status(500).json({
            error:error.message
          })
    }
}


exports.resetPassword = async (req, res) => {
    try{
        const { email, otp, newPassword, confirmPassword } = req.body

        const user = await userModel.findOne({email:email.toLowerCase()})

        const date = new Date()

        if(!user){
            return res.status(404).json({message:`User not found`})
        }

        if (user.otp != otp){
            return res.status(400).json({message:`invalid Otp`})
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message:"confirm password does not match"
            })
        }

        if(user.otpExpiry < date){
            return res.status(400).json({message:"Otp has expired"})
        }

        
    const saltRounds = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

    user.password = hashedPassword
    user.otp = null

    await user.save()

    return res.status(200).json({message: "User Password reset successfully "})

    }catch(error){
        return res.status(500).json({
            error:error.message
          })
    }

}


exports.getAuthUsers = async(req, res)=>{
    try{
        const{ id } = req.user
        const user = await userModel.findById(id)

        if (!user){
            return res.status(404).json({message:"User not found"})
        }

        const userResponse = {
            firstName:newUser.firstName,
            lastName:newUser.lastName,
            email:newUser.email
        }


        res.status(200).json({
            message:"User found", data:userResponse
        })

    
    }catch(error){
        return res.status(500).json({
            error:error.message
          })
    }
}




