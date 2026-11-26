const Joi = require("joi");

exports.registerValidation = (req, res,next)=>{
    const schema = Joi.object({
        fistName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]+$')).min(3).max(30).required().messages({"any.required": "first name must entered",
            "string.empty": "first name should not be empty",
            "string.pattern.base":"first name cna not contain number, special character or empty space and must be at least 3 characters"
        }), 

        lastName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]+$')).min(3).max(30).required().messages({"any.required": "last name must entered",
            "string.empty": "last name should not be empty",
            "string.pattern.base":"last name cna not contain number, special character or empty space and must be at least 3 characters"
        }), 
        email: Joi.string().email().trim().required().message({
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty",
            "string.email":"Email must be a valid email"
        }),


        password: Joi.string().min(8).max(50).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).required().messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password cannot exceed 50 characters",
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "any.required": "Password is required",
        }),

        confirmPassword: Joi.any()
            .valid(Joi.ref("password"))
            .required()
            .messages({
            "any.only": "Passwords do not match",
            "any.required": "Confirm password is required",
        }),
    })

    const { error } = schema.validate(req.body);
    
    if (error){
        res.status(400).json({ error: error.details[0].message })
    }

    next()
}


exports.loginValidation = (req, res,next)=>{
     const schema = Joi.object({
        email: Joi.string().email().trim().required().message({
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty",
            "string.email":"Email must be a valid email"
        }),
        password: Joi.string().min(8).max(50).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).required().messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password cannot exceed 50 characters",
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "any.required": "Password is required",
        }),
    })

    const { error } = schema.validate(req.body);
    

    if (error){
        res.status(400).json({ error: error.details[0].message })
    }

    next()
};

exports.verifyEmailValidation = (req, res,next)=>{
    const schema = Joi.object({
        email: Joi.string().email().trim().required().message({
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty",
            "string.email":"Email must be a valid email"
        }),

        otp: Joi.string().length(6).required(),
    });

    const { error } = schema.validate(req.body);
   
    if (error){
        res.status(400).json({ error: error.details[0].message })
    }

    next()
}

exports.forgotPasswordlValidation = (req, res,next)=>{
    const schema = Joi.object({
        email: Joi.string().email().trim().lowercase().required().message({
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty",
            "string.email":"Email must be a valid email"
        }),
    });

    const { error } = schema.validate(req.body);
   
    if (error){
        res.status(400).json({ error: error.details[0].message })
    }

    next()
}

exports.resetPasswordValidation = (req, res, next)=>{
    const schema = Joi.object({
        password: Joi.string().min(8).max(50).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).required()
            .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password cannot exceed 50 characters",
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "any.required": "Password is required",
        }),

        confirmPassword: Joi.any()
            .valid(Joi.ref("password"))
            .required()
            .messages({
            "any.only": "Passwords do not match",
            "any.required": "Confirm password is required",
        }),
    });

    const { error } = schema.validate(req.body);
   
    if (error){
        res.status(400).json({ error: error.details[0].message })
    }

    next()

}









