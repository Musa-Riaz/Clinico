const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter your name'],
        unique:true
    },

    email:{
        type:String,
        required:[true, 'Please enter your email'],

    },
    
    password:{
        type:String,
        required:[true, 'Please enter your password']
    },

    isAdmin:{
        type:Boolean,
        default:false
    },
    isDoctor:{
        type:Boolean,
        default:false
    }, 
    notifications:{
        type: Array,
        default:[]
    },
    seenNotifications:{
        type: Array,
        default:[]
    }
    


})



module.exports = mongoose.model('users', userSchema)