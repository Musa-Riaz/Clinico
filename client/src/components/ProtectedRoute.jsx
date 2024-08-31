import React, { Children } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  console.log(user);
  //get user
  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${window.location.origin}/api/v1/user/getUserData`,
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.status === "success") {
        dispatch(setUser(res.data?.data));
      } else {
        localStorage.removeItem("token");
        dispatch(setUser(null));
        <Navigate to="/login" />;
      }
    } catch (err) {
      localStorage.removeItem("token");
      dispatch(hideLoading())
      console.log(err);
    }
  };

  useEffect(()=>{
    if(!user)
    getUser();
  }, [ user, getUser ]);

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  else return children;
};

export default ProtectedRoute;
