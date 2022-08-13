const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const nodemailer = require('nodemailer')

// @route GET /api/users
const getUsers = asyncHandler( async (req, res) => {

    // const admin = await User.findById(req.user.id)
    // if(admin.accountType !== 'admin') {
    //     throw new Error('Admin Access Only')
    // }
    
    const users = await User.find(
        { "accountType": /user/i }, 
    );

    // const users = await User.find()
    // res.json(users)

    res.json(users)
})



// @route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, dateOfBirth,
        mobile, password} = req.body

    const admin = await User.findById(req.user.id)
    if(admin.accountType != 'admin') {
        throw new Error('Admin Access Only')
    }


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
    emailUser(email, password)
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

// @route POST /api/users/login
const emailUser = asyncHandler(async (userEmail, userPassword) => {
    const emailTemplate = `
    <h3>Dear student,</h3>
    <h3 style="padding-top: -5px; margin-top: -5px">Please login at http://localhost:5000/api/users/login to reset password. Please use your email and temporary password below to login.</h3>
    <h3 style="padding-bottom: -5px; margin-bottom: -5px">Code : <h1 style="padding: 5px; width: fit-content">${userPassword}</h1></h3>
    `

    async function main() {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        });


        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Student Notes" <process.env.MAIL_USERNAME>', // sender address
            to: userEmail, // list of receivers
            subject: "Welcome User!",
            html: emailTemplate
        });

        console.log("Message sent: %s", info.messageId);

    }


    main().then(() => {
        console.log("successfully mailed")
    })

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