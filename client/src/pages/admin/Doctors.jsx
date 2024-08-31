import React from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { message, Table } from "antd";
const Doctors = () => {
  const [doctor, setDoctor] = useState([]);

  const handleAccountStatus = async (record, status) =>{

    try{
        const res = await axios.post(`${window.location.origin}/api/v1/admin/changeAccountStatus`, {doctorId: record._id, status}, {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });
        if(res.data.status === "success"){
            message.success(res.data.message);
            getDoctors();
        }
        else{
            message.error(res.data.message);
        }

    }
    catch(err){
        console.log(err);
        message.error("Something went wrong");
    }
  }

  const getDoctors = async () => {
    try {
      const res = await axios.get(
        `${window.location.origin}/api/v1/admin/get-all-doctors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.status === "success") {
        console.log(res.data.data);
        setDoctor(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

    const column = [
        {
        title: "Name",
        dataIndex: "name",
        render:(text, record) =>(
            <span>{record.firstName} {record.lastName}</span>
        )
        },
        {
        title: "Email",
        dataIndex: "email",
        },
        {
        title: "Status",
        dataIndex: "status",
       
        },
        {
            title:"Phone",
            dataIndex:'phone'
        },
        {

            title:"Specialization",
            dataIndex:"specialization"

        },
        {
            title:"Actions",
            dataIndex:'actions',
            render:(text, record) =>(
                <div className='d-flex'>
                   {record.status === 'pending' ? <button className="btn btn-success" onClick={() => handleAccountStatus(record, "approved")}>Approve</button>: <button className="btn btn-danger">Reject</button>}
                </div>
            )
        }

    ];

  useEffect(() => {
    getDoctors();
  }, []);

  return <Layout>
    <h1>Doctors List</h1>
    <Table columns={column} dataSource={doctor} />
  </Layout>;
};

export default Doctors;
