import { MdHome } from "react-icons/md";
import { RiFileList2Fill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";



export const userMenu = [{
    name:"Home",
    path:"/",
    icon: <MdHome />
}, 
{
    name:"Appointment",
    path:"/appointment",
    icon: <RiFileList2Fill />
},

{
    name: "Apply Doctor",
    path:"/applyDoctor",
    icon: <FaUserDoctor />
},

{
    name:"Profile",
    path:"/profile",
    icon:<CgProfile />
}

]


export const adminMenu = [{
    name:"Home",
    path:"/",
    icon: <MdHome />
}, 


{
    name: " Doctor",
    path:"/doctors",
    icon: <FaUserDoctor />
},

{
    name:"Profile",
    path:"/profile",
    icon:<CgProfile />
}

]
