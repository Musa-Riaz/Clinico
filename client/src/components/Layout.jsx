import React from "react";
import "../styles/LayoutStyles.css";
import { Link, NavLink } from "react-router-dom";
import { userMenu, adminMenu } from "../Data/data";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {message, Badge} from "antd";
import { IoLogOut } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { RiFileList2Fill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogOut = () =>{
    localStorage.removeItem("token");
    message.success("Logged out successfully");
    navigate("/login");
  }


const doctorMenu  = [{
    name:"Home",
    path:"/",
    icon: <MdHome />
}, 
{
    name:"Appointment",
    path:"/doctor-appointments",
    icon: <RiFileList2Fill />
},


{
    name:"Profile",
    path:`/doctor/profile/:${user?._id}`,
    icon:<CgProfile />
}

]


  //rendring menu based on user role
  const SideBarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>CLINICO</h6>
              <hr />
            </div>
            <div className="menu">
              {SideBarMenu.map((item, index) => (
                <div key={index} className="menu-item">
                  <span className="menu-icon">{item.icon}</span>
                  <NavLink to={item.path}>{item.name}</NavLink>
                </div>
              ))}
            </div>
            <div className="menu-item">
                  <span className="menu-icon"><IoLogOut /></span>
                  <NavLink to="/login" onClick={()=>handleLogOut()}>Logout</NavLink>
                </div>
          </div>

          <div className="content">
            <div className="header">
              <div className="header-content">
                <Badge count ={user?.notifications.length} onClick={() => navigate("/notification")} >
                <IoIosNotifications className="header-icon" style={{cursor:"pointer"}} />
                </Badge>
                <NavLink className="header-name" to="/profile">
                  {user?.name}
                </NavLink>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
