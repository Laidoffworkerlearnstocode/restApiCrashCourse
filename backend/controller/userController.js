const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const path = require('path');
const configPath = path.join(__dirname, '../config/config.env');
const { CustomError } = require('../middleware/errorMiddleware')

dotenv.config({ path: configPath });

//@desc    Regitser new user
//@route   POST /api/users
//@access  Public
const registerUser = asyncHandler(async (req, res, next) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({ errors: err.array() });
    }
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if(user){
        return next(new CustomError('User already exists', 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdAt = Date.now()
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        createdAt
    });
    await newUser.save();
    const token = generateToken(userCreated.id);
    res.status(201).json({
        success: true,
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        token
        })
})

//@desc    Authenticate a user(login)
//@route   POST /api/users/login
//@access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password){
        res.status(400);
        return res.json({
            success: false,
            message: 'Please provide email and password'
        })
    }
    userLogin = await User.findOne({ email });
    if(!userLogin){
        res.status(401);
        return res.json({
            success: false,
            message: 'your email is not registered'
        })
    }
    const isMatch = await bcrypt.compare(password, userLogin.password);
    if(!isMatch){
        res.status(401);
        return res.json({
            success: false,
            message: 'Invalid password'
        })
    } else {
        const token = generateToken(userLogin.id);
        res.status(200).json({
            success: true,
            name : userLogin.name,
            email : userLogin.email,
            token
        })
    }
})

//@desc    Get user data
//@route   Get /api/users/profile
//@access  Private
const getProfile = asyncHandler(async (req, res) => {
    const id = req.userId;
    const user = await User.findById(id).select('name email createdAt');
    if(user){
        res.status(200).json({
            success: true,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        })
    }else{
        res.status(404);
        return res.json({
            success: false,
            message: 'User not found'
        })
    }
})

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}