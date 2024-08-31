import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { DatePicker, Table, TimePicker, message } from "antd";
import Layout from "../components/Layout";
import moment from "moment";
const UserAppointments = () => {
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);

  const { user } = useSelector((state) => state.user);

  const getUserAppointments = async () => {
    try {
      const res = await axios.post(
        `${window.location.origin}/api/v1/user/get-user-appointments`, {userId: user._id},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        }
           
      );

      if (res.data.status === "success") {
        setAppointments(res?.data?.data);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
  if(appointments.length === 0) getUserAppointments();
  }, []);


  const column = [
    {
        title:"ID",
        dataIndex:"_id",
    },
    {
        title:"Doctor Name",
        dataIndex:"name",
        render: (text, record) =>(
            <span>  {record.doctorId.firstName} {record.doctorId.Lastname}</span>
          
        )
    },
    {
        title:"Phone",
        dataIndex:"phone",
        render: (text, record) =>(
            <span>  {record.doctorInfo.phone}</span>
          
        )
    },
    {
        title:"Date",
        dataIndex:"date",
        render: (text, record) =>(
            <span> {moment(record.date).format("DD-MM-YYYY")}</span>
          
        )
    },
    {
        title:"Timing",
        dataIndex:"timing",
        render: (text, record) =>(
            <span>  {moment(record.data).format("HH:mm")}</span>
          
        )
    },
    {
        title:"Status",
        dataIndex:"status",

    }
  ]

  return <Layout>
    <h1>{`${user?.name}`}'s Appointments</h1>

  <Table columns={column} dataSource={appointments}/>
  </Layout>;
};

export default UserAppointments;
