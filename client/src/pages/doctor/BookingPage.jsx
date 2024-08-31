import Layout from "../../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from 'react-redux'; 
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
const BookingPage = () => {
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [timings, setTimings] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  

  const {user}  = useSelector(state => state.user);

  const params = useParams();


  const handleAvaiability = async () => {
try{

  dispatch(showLoading());
  const res = await axios.post(`${window.location.origin}/api/v1/user/booking-availablity`, {
    date: date,
    timing: timings,
    doctorId: params.id,
  }, {
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  dispatch(hideLoading());
  if(res.data.status === 'success'){
    setIsAvailable(true);
    message.success(res.data.message);

  }
  else{
    message.error(res.data.message);
  }

}
catch(err){
  dispatch(hideLoading());
  console.log(err)
}

  }


  const handleBooking = async ()=>{
    try{
      dispatch(showLoading());
      const res = await axios.post(`${window.location.origin}/api/v1/user/book-appointment`, {
        userId: user._id,
        doctorId: params.id,
        UserInfo: user,
        doctorInfo: doctor,
        date: date,
        timing: timings,

      }, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading());
      if(res.data.status === 'success'){
        message.success('Appointment Booked Successfully');
      }
      else{
        console.log(res.data.message);
      }

    }
    catch(err){ 
      dispatch(hideLoading());
      console.log(err);

    }
  }

  const getDoctorById = async () => {
    try {
      const res = await axios.get(
        `${window.location.origin}/api/v1/doctor/getDoctorById/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.status === "success") {
        setDoctor(res.data.data);
        console.log(doctor);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDoctorById();
  }, []);

  return (
    <Layout>
      <h1>Booking Page</h1>
      <div className="container m-2">
        {doctor && (
          <div>
            <h4>
              Dr.{doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fees: {doctor.consultationFees}</h4>
            <h4>
              Timings: {doctor.timing && doctor.timing[0]} -{" "}
              {doctor.timing && doctor.timing[1]}{" "}
            </h4>

            <div className="d-flex flex-column  ">
              <DatePicker
              className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <TimePicker
              className="m-2"
                format="HH:Mmm"
                onChange={(value) =>
                  setTimings(moment(value).format("HH:mm"))
                }
              />
              <button className="btn btn-primary mt-2" onClick={handleAvaiability}>
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
