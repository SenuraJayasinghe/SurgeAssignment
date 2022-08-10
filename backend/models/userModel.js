const mongoose =  require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
    },

    lastName:{
        type:String,
    },

    email:{
        type:String,
        required: [true, 'Please add an email'],
        unique: true
    },

    dateOfBirth:{
        type:Date,
    },
     
    mobile:{
        type:Number,
    },

    status:{
        type:Boolean,
    },

    password:{
        type:String,
        required: [true, 'Please add a password']
    },

    accountType:{
        type:String,
        
    }
    
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)