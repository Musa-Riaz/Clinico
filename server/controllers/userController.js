const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const moment = require('moment');
const appointmentModel = require("../models/appointmentModel");
exports.registerUserController = async (req, res, next) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }

  next();
};

exports.loginUserController = async (req, res, next) => {

    try{
        const user = await userModel.findOne({email: req.body.email});
        
        if(!user) return res.status(400).json({status: 'failed', message: 'User not found'});
    
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if(!comparePassword) return res.status(200).json({status: 'fail', message: 'Invalid Email or password'});
    
        const loginToken =  jsonwebtoken.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.status(200).json({status: 'success', token: loginToken});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: 'failed', message: 'Internal server error'});
    }
   
    next();
};

exports.authController = async (req, res, next) =>{
    try{

        const user = await userModel.findOne({_id: req.body.userid});
        user.password = undefined;
        if(!user) return res.status(400).json({status: 'fail', message: 'User not found'});     
        
        else{
            res.status(200).json({
                status:'success',
                data:user
            });
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:'fail',
            message:'Internal server error'
        })
    }
}


exports.applyDoctorController = async (req, res, next)=>{

  try{

    const newDoctor = await doctorModel.create(req.body); //we will first create the new doctor from the values passed from the front end
    const adminUser = await userModel.findOne({isAdmin: true}) //second, we will find the admin, because we are going to need teh admin to approve the application for the new doctor

    adminUser.notifications.push({ //after getting the admin, we are going to push the notifications array with different objects for the admin to see
      type:"apply-doctor-request",
      message: `New doctor application received from ${newDoctor.firstName} ${newDoctor.lastName}`,
      data:{
        doctorId: newDoctor._id,
        doctorName: `${newDoctor.firstName} ${newDoctor.lastName}`,
        link: `/admin/doctor/${newDoctor._id}`,
      }
    });
    await userModel.findByIdAndUpdate(adminUser._id, adminUser); //after pushing the notifications array, we are going to update the admin user in the database 
    res.status(201).json({
      status:"success",
      message:"Doctor application submitted successfully"
    });

  }
  catch(err){
    console.log(err);
    res.status(500).json({
      status:'fail',
      message:'Internal server error'
    });
  }


}



exports.getAllNotificationsController = async (req, res, next) =>{

  try{

    const user = await userModel.findOne({_id: req.body.userid}); //we are going to find the user who is logged in
    const notifications = user.notifications; //we are going to get the notifications from the user
    user.seenNotifications.push(...notifications); //we are going to push the notifications to the seen notifications
    console.log(user.seenNotifications);
    user.notifications = []; //we are going to empty the notifications array afterwards
    const updatedUser = await user.save();
    res.status(200).json({
      status:'success',
      message:"All notifications marked as read",
      data: updatedUser
    })

  }
  catch(err){
    console.log(err);
    res.status(500).json({
      status:'fail',
      message:"The was a problem in the Notifications Controller"
    })
  }
}


exports.deleteAllNotificationsController = async (req, res, next) =>{
  try{

    const user = await userModel.findOne({_id: req.body.userid}); 

    user.seenNotifications = []; //we are going to empty the seen notifications array
    const updatedUser = await user.save();
    res.status(200).json({
      status:'success',
      message:"All notifications deleted",
      data: updatedUser
    })
    

  }
  catch(err){
    console.log(err);
    res.status(500).json({
      status:'fail',
      message:"The was a problem in the Delete Notifications Controller"
    })
  }
}

exports.bookAppointmentController =  async (req, res) =>{
  try{
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString(); //we are going to format the date to a specific format
    req.body.timing = moment(req.body.timing, "HH:mm").toISOString(); //we are going to format the timing to a specific format
    req.body.status = 'pending';
    await appointmentModel.create(req.body); //we are going to create a new appointment from the values passed from the front end
    const user = await userModel.findOne({_id: req.body.doctorInfo.userId}); //we are going to find the doctor and send them the notification
    user.notifications.push({
      type:"book-appointment",
      message:`A new appointment from ${req.body.UserInfo.name}` ,
      link: '/user/appointments'

    });
    await user.save();
    res.status(200).json({
      status:"success",
      message:"Appointment booked successfully",
    });


  }
  catch(err){
    console.log(err);
    res.status(500).json({
      status:'fail',
      message:'Book Appointment Controller error',
      err
  });
}

}

exports.bookingAvailablityController = async (req, res) =>{
  try{

    const date = moment(req.body.date, "DD-MM-YYYY").toString();
    const fromTime = moment(req.body.timing, "HH:mm").subtract(1, 'hours').toISOString();
    const toTime = moment(req.body.timing, "HH:mm").add(1, 'hours').toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({doctorId, date, timing:{
      $gte: fromTime,
      $lte: toTime
    }});

    if(appointments.length === 0){
      res.status(200).json({
        status:"success",
        message:"Booking available",
        data: appointments
      });
     
  }
  else if(appointments.length > 0){
    res.status(200).json({
      status:"fail",
      message:"Booking not available",
      data: appointments
  })
}
  
}
  catch(err){ console.log(err);
    res.status(500).json({
      status:'fail',
      message:'Booking Availablity Controller error',
      err
  });
   
  }
}

exports.getUserAppointmentsController = async (req, res) =>{
  try{

    const appointments = await appointmentModel.find({userId: req.body.userId});
    
      res.status(200).json({
        status:"success",
        message:"Appointments fetched",
        data: appointments
      });


  }
  catch(err){
    console.log(err);
    res.status(500).json({
      status:'fail',
      message:'Get User Appointments Controller error',
      err
  });
}

}