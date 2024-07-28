import React from 'react'
import {useEffect} from 'react'
import axios from 'axios'
const HomePage = () => {
  //login user data
  async function getUserData() {
    try {
      const res = await axios.post("http://localhost:4500/api/v1/user/getUserData", {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return res.data;
    } catch (err) {
      console.error('Error fetching user data:', err);
      // Optionally handle the error more gracefully
      throw err;
    }
  }
  


  useEffect(()=>{
    getUserData();
  }, [])
  return (
    <div>
      HI
    </div>
  )
}

export default HomePage
