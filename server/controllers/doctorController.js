const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");
exports.getDoctorInfoController = async (req, res) => {
    try{

        const doctor = await doctorModel.findOne({userId: req.body.userId});
        res.status(200).json({
            status:'success',
            message:'Got doctor info',
            data: doctor
        
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:'fail',
            message:'Error in doctor info controller'
        });
    }

}

exports.updateDoctorInfoController = async (req, res) =>{
    try{
        const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body);
        res.status(200).json({
            status:'success',
            message: 'Doctor info updated',
            data: doctor
        });

    }

    catch(err){
        console.log(err);
        res.status(500).json({
            status:'fail',
            message:'Error in update doctor info controller'
        });
    }
}

exports.getDoctorListController = async (req, res) =>{
    try{

        const doctorsList = await doctorModel.find({status: 'approved'});
        if(doctorsList.length >= 0){
            res.status(200).json({
                status:'success',
                message:"Got all doctors data",
                data : doctorsList
            });
        }
        else{
            re.status(404).json({
                status:'fail',
                message:'Doctors not found',
                
            })
        }


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:'fail',
            message:"There was an error in the get doctor's list controller",
            err
        })
    }
}

exports.getDoctorByIdController = async (req, res) =>{
    try{
        const doctor = await doctorModel.findById(req.params.id);
        if(doctor){
            res.status(200).json({
                status:'success',
                message:"Doctor Fetched Successfully",
                data: doctor
            });
        }
        else{
            res.status(404).json({
                status:'fail',
                message:"The Doctor Could Not Be Found"
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:'fail',
            message:'There was an error in Get Doctor By Id controller',
            err
        })
    }
}


exports.getDoctorAppointmentsController =  async (req, res) =>{
    try{

        const doctor = await doctorModel.findOne({userId: req.body.userId});
        const appointments = await appointmentModel.find({doctorId: doctor._id});
        res.status(200).json({
            status:"success",
            message:"Got doctor appointments",
            data: appointments
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:'fail',
            message:'There was an error in get doctor appointments controller',
            err
    });
}

}

exports.updateAppointmentStatusController = async (req, res) =>{
    try{

        const {appointmentId, status} = req.body;
        const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, {status});
        const user = await userModel.findOne({_id: appointment.userId}); //we are going to find the doctor and send them the notification
        user.notifications.push({
          type:"Status updated",
          message:`Your appointment status has been updated to ${status}` ,
          link: '/doctor-appointments'
    
        });
        await user.save();

        res.status(200).json({
            status:'success',
            message:'Appointment status updated',
            data: appointment
        });
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:'fail',
            message:'There was an error in update appointment status controller',
            err
        });
    }
}