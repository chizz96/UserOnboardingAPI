const  Joi = require('joi')


exports.onboardUser = (req, res, next)=>{
    const schema = Joi.object({
        phoneNumber: Joi.string()
            .trim()
            .pattern(/^(\+234|0)[789][01]\d{8}$/).optional()
            .message("Phone number must be a valid phone number"),

        gender:Joi.string()
            .valid("male", "female")
            .optional()
            .messages({
            "any.only": "Gender must be male or female",
            "any.required": "gender is required",
        }),

        dateOfBirth:Joi.date().max(2008).iso().optional().message("Date format is YYY-MM-DD")

    })
    
}