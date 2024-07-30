import React from 'react'
import Layout from '../components/Layout'
import {Tabs, message} from "antd";
import { useSelector } from 'react-redux';
import axios from 'axios'
import {useDispatch} from "react-redux";
import {showLoading, hideLoading} from "../redux/features/alertSlice";

const NotificationPage = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);



   const handleMarkAllRead = async () =>{

    try{
        dispatch(showLoading());
        const res = await axios.post("http://localhost:4500/api/v1/user/get-all-notifications", {userid: user._id}, {
            headers:{
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        });

        dispatch(hideLoading());
        if(res.data.status === 'success'){
            console.log(res.data.notifcations)
            message.success(res.data.message);
            window.location.reload();
        }
        else{
            message.error(res.data.message)
        }

    }
    catch(err){
        console.log(err);

    }

   } 
   const handleDeleteAllRead = async () =>{

    try{

        dispatch(showLoading());
        const res = await axios.post("http://localhost:4500/api/v1/user/delete-all-notifications", {userid: user._id}, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        dispatch(hideLoading());
        if(res.data.status === "success"){
            message.success(res.data.message);
            window.location.reload();
        }
        else{
            message.error(res.data.message);
        }

    }
    catch(err){
        console.log(err)
    }

   } 


  return (
    <Layout>
      <h4 className='p-3 text-center'></h4>
      <Tabs>
        <Tabs.TabPane tab="UnRead" key={0}>
            <div className="d-flex justify-content-end">
                <h4 className='p-2' onClick={handleMarkAllRead} style={{cursor:"pointer"}}>Mark All Read</h4>
            </div>
            {user?.notifications?.map((notification, index) => (
                <div className="card" onClick={notification.data.link}>
                    <div className="card-text ">
                        {notification.message}
                    </div>
                </div>
            ))}

        </Tabs.TabPane>


        <Tabs.TabPane   tab="Read" key={1}>
            <div className="d-flex justify-content-end" >
                <h4 className='p-2 text-primary' onClick={handleDeleteAllRead} style={{cursor:"pointer"}}>Delete All Read</h4>
            </div>
            {user?.seenNotifications?.map((notification, index) => (
                <div className="card" onClick={notification.data.link}>
                    <div className="card-text">
                        {notification.message}
                    </div>
                </div>
            ))}
        </Tabs.TabPane>

      </Tabs>
      
     
     
    </Layout>
  )
}

export default NotificationPage
