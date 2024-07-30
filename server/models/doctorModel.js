const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'Please enter your first name'],
    },
    lastName:{
        type:String,
        required:[true, 'Please enter your last name'],
    },
    userId:{
            type:String
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"]
    },

    email:{
        type:String,
        required:[true, 'Please enter your email'],
    },
    website:{
        type:String,
    
    },
    address:{
        type:String,
        required:[true, 'Please enter your address'],
    },
    specialization:{
        type:String,
        required:[true, 'Please enter your specialization'],
    },
    experience:{
        type:String,
        required:[true, 'Please enter your experience'],
    },
     consultationFees:{
        type:Number,
        
     },
     timing:{
        type:Object,
        required:[true, 'Please enter your timing'],
     }



})


module.exports = mongoose.model('doctors', doctorSchema)