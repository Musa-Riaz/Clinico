const userModel = require('../models/userModel');
const doctorModel = require('../models/doctorModel');

exports.getAllUsersController = async (req, res) =>{

    try{

        const users = await userModel.find({});
        if(users.length === 0){
            return res.status(200).json({status: 'success', message: 'No users found'});
        }   
        else{
            res.status(200).json({
                status:"success",
                message:"Got all users",
                data: users
                
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({status: 'failed', message: 'Error in getting users'});
    }

}
exports.getAllDoctorsController = async (req, res) =>{


    
    try{

        const doctors = await doctorModel.find({});
        if(doctors.length === 0){
            return res.status(200).json({status: 'success', message: 'No doctors found'});
        }   
        else{
            res.status(200).json({
                status:"success",
                message:"Got all doctors",
                data: doctors
                
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({status: 'failed', message: 'Error in getting doctors'});
    }


}

exports.changeAccountStatusController = async (req, res) =>{
    try{

        const {doctorId, status} = req.body; //we will get the doctor's id and status from the request
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status}); //we will find the doctor by id and update the status
        const user = await userModel.findById(doctor.userId); //we will find the user by the doctor's userId to send them notifications of approval

      user.notifications.push({
        type:"doctor-account-request-updated",
        message:`Your account status has been updated to ${status}`,
        link: "/notification"
      });

      {status === 'approved' ? user.isDoctor = true : user.isDoctor = false} //if the status is approved, we will set the user's isDoctor to true, else we will set it to false
      await user.save(); //we will save the user
      res.status(201).json({
        status:"success",
        message:"Account status updated successfully",
        data: doctor
      });


    }
    catch(err){
        console.log(err)
        res.status(500).json({status: 'failed', message: 'Error in changing the status of the Account'});
    }
}