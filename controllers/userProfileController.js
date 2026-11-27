const userModels = require('../models/user')

const cloudinary = require('../config/cloudinary')

const fs = require("fs")



exports.getProfile = async(req, res)=>{
    try{
        const{ id } = req.user
        const user = await userModels.findById(id)

        if (!user){
            return res.status(404).json({message:"User not found"})
        }

        const userProfile = {
             phoneNumber: user.phoneNumber,
             gender: user.gender,
             dateOfBirth: user.dateOfBirth,
             profilePicture: user.profilePicture.profilePictureUrl
        }

        return res.status(200).json({
            message:"User found", data:userProfile
        })
    
    }catch(error){
        return res.status(500).json({
            error:error.message
          })
    }
}

exports.onboardUser = async(req, res)=>{
      try{
        const{ id } = req.user
        const { phoneNumber, gender, dateOfBirth } = req.body

        const file = req.file

        const user = await userModels.findById(id)

        if (!user){
            fs.unlinkSync(file.path)
            return res.status(404).json({message:"User not found"})
        }

        const userPhoneNumber = await userModels.fineOne(phoneNumber)

        if(userPhoneNumber){
            return res.status(400).json({message:"Phone number already exist"})
        }

        const data = {
            phoneNumber,
            gender,
            dateOfBirth
        }
        if (phoneNumber) data.phoneNumber = phoneNumber
        if (gender) data.gender = gender
        if (dateOfBirth) data.dateOfBirth = dateOfBirth

        if (file){
            await cloudinary.uploader.destroy(student.profilePicture.imageId);

            const result = await cloudinary.uploader.upload(file.path)
            data.profilePicture.imagePath = result.secure_url
            data.profilePicture.imageId = result.public_id
        }

        data.onboarding = "profile_Complete"

        const onboardUser = await findByIdAndUpdate(data)

        fs.unlinkSync(file.path)

        const userResponse = {
            phoneNumber:onboardUser.phoneNumber,
            gender:onboardUser.phoneNumber,
            dateOfBirth:onboardUser.dateOfBirth,
            profilePicture:onboardUser.profilePicture
        }


        res.status(200).json({
            message:"User found", data:userResponse
        })

    
    }catch(error){
        if(error){
            if(req.file){
                fs.unlinkSync(req.file.path)
            }
        }
        return res.status(500).json({
            error:error.message
            })
    }

}
   


