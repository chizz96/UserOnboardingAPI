const router = require('express').Router();

const upload = require("../middleware/multer")

const { } = require("../middleware/userProfileValidation")

const {  getProfile, onboardUser} = require('../controllers/userProfileController')

const { authenticate } = require('../middleware/authorization')




router.get('/api/users/profile', authenticate, getProfile)

router.patch('/api/users/onboarding',authenticate, upload.single("profilePicture"), onboardUser)


module.exports = router