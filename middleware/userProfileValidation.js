const Joi = require('joi')


exports.onboardUserValidation = (req, res, next)=>{
    const schema = Joi.object({
        phoneNumber: Joi.string()
            .trim()
            .pattern(/^(\+234|0)[789][01]\d{8}$/).optional()
            .message("Phone number must be a valid phone number"),


        gender: Joi.string()
            .valid("male", "female")
            .optional()
            .messages({
                "any.only": "Gender must be male or female",
                "any.required": "gender is required",
        }),

        dateOfBirth: Joi.date().iso().optional().message({ "date.format": "Date format must be YYYY-MM-DD" })

    })

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    next()

}