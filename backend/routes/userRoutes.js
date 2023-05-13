const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getProfile } = require('../controller/userController')
const { body } = require('express-validator')
const auth = require('../middleware/authMiddleware')

const userValidationRules = [
    body('name').isLength({ min:3 }).withMessage('name can not be less than 3 characters'),
    body('email').isEmail().withMessage('email is not valid'),
    body('password').isLength({ min:6 }).withMessage('password can not be less than 6 characters')
]

router.post('/', userValidationRules, registerUser)
router.post('/login', loginUser)
router.get('/profile', auth, getProfile)

module.exports = router