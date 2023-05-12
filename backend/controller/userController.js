const asyncHandler = require('express-async-handler');

//@desc    Regitser new user
//@route   POST /api/v1/users
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
    await res.send({
        message: 'Regiter User'
    })
})

//@desc    Authenticate a user(login)
//@route   POST /api/v1/users/login
//@access  Public
const loginUser = asyncHandler(async (req, res) => {
    await res.send({
        message: 'login User'
    })
})

//@desc    Get user data
//@route   Get /api/v1/users/profile
//@access  Private
const getProfile = asyncHandler(async (req, res) => {
    await res.send({
        message: 'User Data'
    })
})


module.exports = {
    registerUser,
    loginUser,
    getProfile
}