import Layout from "../components/Layout";
import React from "react";
import { Form, Row, Col, Input, TimePicker } from "antd";

const ApplyDoctor = () => {

  const handleFinish = (values) => {
    console.log(values)
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
            <TimePicker.RangePicker />
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
