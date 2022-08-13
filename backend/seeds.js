const mongoose = require('mongoose');
const User = require('../models/userModel')
const Note = require('../models/noteModel')
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.log(err);
    });

const seedUsers = [
    {
        email: "admin@gmail.com",
        password: "$2a$10$cjyIoZxB7Sq/NCqafDeG.OLmGRLIPM/C9tnoBMHBTdbIp/nPiQm/u", // Email='admin@gmail.com' Password='admin123'
        accountType: "admin",
        status: true,
        phone: "0778956785",
        dateOfBirth: new Date(),
        firstName: "James",
        lastName: "Taylor"
    },

    {
        email: "anna@gmail.com",
        password: "$2a$10$zLfalId/4.yNFdCTNeu1Cuf0t8BomEXlG8GoGE0S/GmXLNHVr3oZ6", // (First time user) Email='anna@gmail.com' Password='anna123'
        accountType: "student",
        status: false,
        phone: "0775698726",
        dateOfBirth: new Date(),
        firstName: "Anna",
        lastName: "Smith"
    },
    {
        email: "david@gmail.com",
        password: "$2a$10$OOLAGS6zZul2S7jBiVsXsOkYKG7OS/PHlOuLrBQjKPFE2fhTz2lPW", // Email='david@gmail.com' Password='david123'
        accountType: "student",
        status: true,
        phone: "0778965457",
        dateOfBirth: new Date(),
        firstName: "David",
        lastName: "Brown"
    }  

];


const seedDB = async () => {
    await Note.deleteMany({});
	await User.deleteMany({});
    await User.insertMany(seedUsers);
};

console.log("Seed users added successfully!")

seedDB().then(() => {
    mongoose.connection.close();
});