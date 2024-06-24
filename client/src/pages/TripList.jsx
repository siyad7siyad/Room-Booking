import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../Components/Loader";
import NavBar from "../Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";

const TripList = () => {
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state)=>state.user._id)
  const tripList = useSelector((state)=>state.user.tripList) 

  const dispatch = useDispatch()

  const getTripList = async()=>{
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/trips`,{
        method:"GET"
      })

      const data = await response.json()
      dispatch(setTripList(data))
      setLoading(false)

      
    } catch (err) {
      console.log("fetch triplist failed",err.message);
      
    }
  }

  useEffect(()=>{
    getTripList()
  },[])

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">

      </div>
    </>
  );
};

export default TripList;
