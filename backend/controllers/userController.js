const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @route GET /api/users
const getUsers = asyncHandler( async (req, res) => {
    const users = await User.find()
    res.json(users)
})

// @route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, dateOfBirth,
        mobile, password} = req.body

    if( !email || !password){
       res.status(400)
       throw new Error('Please fill all fields')
}

const userExists = await User.findOne({email})
     if (userExists) {
         res.status(400)
         throw new Error('User already exists')
     }

// Hash password
const salt = await bcrypt.genSalt(10)    
const hashPassword= await bcrypt.hash(password, salt)

// Create user
const user = await User.create({
    firstName,
    lastName,
    email,
    dateOfBirth,
    mobile,
    status: false,
    password: hashPassword,
    accountType: 'user'
}) 
   if(user){
     res.status(201).json({
         id: user.id,
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
         dateOfBirth: user.dateOfBirth,
         mobile: user.mobile,
         status: user.status,
         accountType: user.accountType,
         token: generateToken(user.id),
     })
   } else{
       res.status(400)
       throw new Error('Invalid user data')
   }
 
})

// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            dateOfBirth: user.dateOfBirth,
            status: user.status,
            accountType: user.accountType,
            token: generateToken(user.id),

        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @route GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
    const {id,firstName, lastName, email, dateOfBirth,
        mobile, status, accountType} = await User.findById(req.user.id)

    res.json({
        id,
        firstName,
        lastName,
        email, 
        dateOfBirth,
        mobile,
        status,
        accountType
    })
 })

 const updateUser = asyncHandler (async (req, res) => {

    const {firstName, lastName, email, dateOfBirth,
        mobile, password, accountType} = req.body

        console.log(req.user)

    const user = await User.findById(req.user.id)    

    console.log(req.body)  
   
    if(!user) {
        res.status(400)
        throw new Error('user not found')
    }

    const salt = await bcrypt.genSalt(10)    
    const hashPassword= await bcrypt.hash(password, salt)

    const updateDetails = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        status: true,
        password: hashPassword,
        accountType
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id,
    updateDetails,{new: true})                            

    res.json({
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        dateOfBirth: updatedUser.dateOfBirth,
        mobile: updatedUser.mobile,
        status: updatedUser.status,
        accountType: updatedUser.accountType,
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    
    }   
      
    
    await user.remove()

    res.json({id: req.params.id} )
})

// generate web token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
     expiresIn: '30d',
    })
}

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getMe
}