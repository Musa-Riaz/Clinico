import Layout from "../components/Layout";
import React from "react";
import { Form, Row, Col, Input, TimePicker, message, Badge } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {showLoading, hideLoading} from "../redux/features/alertSlice";
import axios from 'axios';
import moment from 'moment'
import { useNavigate } from "react-router-dom";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state=> state.user);


  const handleFinish = async (values) => {

    try{
      dispatch(showLoading());
      const res = await axios.post(`${window.location.origin}/api/v1/user/apply-doctor`, {...values, userId: user._id,  timing:[
        moment(values.timing[0]).format("HH:mm"),
        moment(values.timing[1]).format("HH:mm"),
    ]}, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });  
      dispatch(hideLoading());
      if(res.data.status === 'success'){
        message.success("Applied successfully");
        navigate("/");
      }
      else{
        message.error(res.data.message)
      }
    }
    catch(err){
      dispatch(hideLoading());
      console.log(err);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1>Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
            </Col>
          
            <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true }]}
            >
              <Input placeholder="E-mail" />
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Website"
              name="website"
              rules={[{ required: true }]}
            >
              <Input placeholder="Website" />
            </Form.Item>
            </Col>
        </Row>



        <h4 className="">Professional Details</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true }]}
            >
              <Input placeholder="Specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true }]}
            >
              <Input placeholder="Experience" />
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timing"
            >
            <TimePicker.RangePicker format="HH:mm"/>
            </Form.Item>
            </Col>  
            <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees per Consultation"
              name="consultationFees"
                rules={[{ required: true }]}
            >
              <Input placeholder="Fees per Consultation" />
            </Form.Item>
            </Col>
          
        </Row>
        <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
