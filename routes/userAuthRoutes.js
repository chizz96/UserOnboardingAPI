const router = require('express').Router();

const { register, login, verifyEmail,forgotPassword, resetPassword, getAuthUsers} = require('../controllers/userAuthController')

const {registerValidation, verifyEmailValidation, loginValidation, forgotPasswordlValidation,resetPasswordValidation} = require('../middleware/userValidation')

const { authenticate } = require('../middleware/authorization')

router.post('/api/auth/register',registerValidation, register)

router.post('/api/auth/verify-email', verifyEmailValidation, verifyEmail)

router.post('/api/auth/login', loginValidation, login)

router.post("/api/auth/forgot-password", forgotPasswordlValidation, forgotPassword);

router.post("/api/auth/reset-password",resetPasswordValidation, resetPassword)

router.get('/api/auth/me', authenticate, getAuthUsers)



module.exports = router