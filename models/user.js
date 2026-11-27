const mongoose = require('mongoose')
const { timeStamp } = require('node:console')

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
        default:null
    },
    otpExpiry:{
        type:Date
    },

    phoneNumber:{
        type:String,
        unique:true,
        require:true
    },
    gender:{
        type:String,
        enum:['male', 'female'],
    },
    dateOfBirth:{
        type:Date,
        require:true
    },
    profilePicture:{

        profilePictureUrl:{
            type:String,required:true
        },
        profilePictureId:{
            type:String, required:true
        }
    },
    onboarding:{
        type:String,
        enum:['Profile_Complete', 'profile_Incomplete'],
        default:'profile_Incompelete'
    },

},{
    timeStamp:true
})

const userModel = mongoose.model('Users', userSchema)

module.exports = userModel