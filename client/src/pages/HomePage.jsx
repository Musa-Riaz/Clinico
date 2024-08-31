import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import DoctorList from "../components/DoctorList";
import { Row } from "antd";
const HomePage = () => {
  const [doctorList, setDoctorList] = useState([]);
  const navigate = useNavigate();
  //login user data
  async function getDoctorList() {
    try {
      const res = await axios.get(
        `${window.location.origin}/api/v1/doctor/getDoctorList`,
        
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(res.data.status === 'success'){
        setDoctorList(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      // Optionally handle the error more gracefully
      throw err;
    }
  }

  useEffect(() => {
    getDoctorList();
  }, []);
  return <Layout>
    <h1 className="text-center">Homepage</h1>
    <Row>

  {doctorList?.map((doctor) => (
    <DoctorList doctor = {doctor} />
  ))}
    </Row>
  </Layout>;
};

export default HomePage;
