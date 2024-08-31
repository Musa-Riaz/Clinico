import React from "react";
import axios from "axios";
import moment from "moment";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { Table, message } from "antd";
import { useSelector } from "react-redux";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.user);

  const getDoctorAppointments = async () => {
    try {
      const res = await axios.post(
        `${window.location.origin}/api/v1/doctor/get-doctor-appointments`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.status === "success") {
        setAppointments(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleStatus = async (record,text) =>{
    try{
        const res = await axios.post("http://:4500/api/v1/doctor/update-appointment-status", {appointmentId: record._id, status: text}, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if(res.data.status === 'success'){
            message.success("Status Updated");
            getDoctorAppointments();
        }
        else{
            message.error(res.data.message);
        }

    }
    catch(err){
        console.log(err);

    }
  }

  useEffect(() => {
    if (appointments.length === 0) getDoctorAppointments();
  }, []);

  const column = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //     title:"Doctor Name",
    //     dataIndex:"name",
    //     render: (text, record) =>(
    //         <span>  {record.doctorId.firstName} {record.doctorId.Lastname}</span>

    //     )
    // },
    // {
    //     title:"Phone",
    //     dataIndex:"phone",
    //     render: (text, record) =>(
    //         <span>  {record.doctorInfo.phone}</span>

    //     )
    // },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <span> {moment(record.date).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Timing",
      dataIndex: "timing",
      render: (text, record) => (
        <span> {moment(record.data).format("HH:mm")}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => (
        <>
          <div className="d-flex">
            {record.status === "pending" && (
              <div className="d-flex">
                <button className="btn btn-success" onClick={() => handleStatus(record, 'approved')}>Approve</button>
                <button className="btn btn-danger" onClick={() => handleStatus(record, 'rejected')}>Reject</button>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];
  return (
    <Layout>
      <h1>Doctors Appointments</h1>
      <Table columns={column} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
