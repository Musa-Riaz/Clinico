import React from 'react'
import Layout from '../../components/Layout'
import {useState, useEffect} from 'react'
import { Table, Button, message } from 'antd';
import axios from 'axios';
const Users = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () =>{

        try{

            const res = await axios.get(`${window.location.origin}/api/v1/admin/get-all-users`, {headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }});
            if(res.data.status==='success'){
                console.log(res.data.data);
                setUsers(res.data.data);
            }
            else{
                message.error(res.data.message);
            }

        }
        catch(err){
            console.log(err);
            
        }
       
    }

    const column = [
        {
            title:"Name",
            dataIndex: "name"
        },
        {
            title:"Email",
            dataIndex: "email"
        },
        {

            title:"Doctor",
            dataIndex: "isDoctor",
            render: (text, record) =>(
                <div>
                   <span>
                   {record.isDoctor ? "Yes": "No" }
                   </span> 
                </div>
            )

        },
        {
            title:"Actions",
            dataIndex:'actions',
            render :(text, reder) =>(
                <div className='d-flex'>
                    <button className='btn btn-danger'>Block</button>
                </div>
            )
        }
    ]


    useEffect(() =>{
        getUsers();
    }, [])


  return (
    <Layout>
      <h1>Users List</h1>
      <Table columns={column} dataSource={users}></Table>
    </Layout>
  )
}

export default Users
