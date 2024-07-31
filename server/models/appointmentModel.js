const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true,

    },
    doctorInfo:{
        type:String,
        required:true
    },
    UserInfo:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:'pending'
    },
    timing:{
        type:String,
        required:true
    }
}, {timestamps:true});


module.exports = mongoose.model('appointments', appointmentSchema);