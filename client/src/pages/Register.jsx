import React from "react";
import { Form, Input, message } from "antd";
import "../styles/RegisterStyles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 async function onFinishHandler(values) {
  try{
    dispatch(showLoading());
   const res = await axios.post("http://localhost:4500/api/v1/user/register", values);
    dispatch(hideLoading());
   if(res.data.status === 'success'){

     message.success("User registered successfully");
     navigate('/login');
   }
   else{
      message.error(res.data.message);
   }
  }
  catch(err){
    dispatch(hideLoading());
    console.log(err);
  }
   
  }
  
  
  return (
    <div>
      {/* The name property must have the same values as we would define in the model schema*/}
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">REGISTERATION FORM</h3>
          <Form.Item label="Username" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-3">
            Already a user? Click Here to Login
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
