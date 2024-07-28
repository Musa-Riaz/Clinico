const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
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
        console.log(user)
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
        if(!user) return res.status(400).json({status: 'fail', message: 'User not found'});     

        else{
            res.status(200).json({
                status:'success',
                data:{
                    name: user.name,
                    email: user.email
                }
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
