import React from "react";
import { Form, Input, message } from "antd";
import "../styles/RegisterStyles.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onFinishHandler(values) {

    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:4500/api/v1/user/login",
        values
      );
      dispatch(hideLoading());
      if (res.data.status === "fail") {
        message.error(res.data.message);
      } else if(res.data.status === 'success'){
        message.success("User logged in successfully");
        localStorage.setItem("token", res.data.token);
        navigate("/");
        console.log(res.data.token);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
      message.error("Something went wrong");
    }
  }

  return (
    <div>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">LOGIN FORM</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="m-3">
            Not a User? Click Here to Register
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
