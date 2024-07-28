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
    }


})

userSchema.pre('save', async function(next){
    
})

module.exports = mongoose.model('users', userSchema)