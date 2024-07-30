const doctorModel = require("../models/doctorModel");

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
        const doctor = await doctorModel.findByIdAndUpdate({userId: req.body.userId}, req.body, {new: true});
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