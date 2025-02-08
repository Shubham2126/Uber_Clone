import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { socketDataContext } from "../context/SocketContext";
import axios from "axios";
const CaptainHome = () => {
  const [ridePopUp, setRidePopUp] = useState(false);
  const [confirmRidePopUp, setConfirmRidePopUp] = useState(false);
  const [ rideDetail, setRideDetail] = useState(null)
  const ridePopUpRef = useRef(null);
  const ConfirmRidePopUpRef = useRef(null);
  const {captain} = useContext(CaptainDataContext)
  const {socket} = useContext(socketDataContext)

  useEffect(()=>{
    socket.emit('join',{userType: 'captain', userId: captain._id})
    
    const updateLocation = ()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positon =>{
          socket.emit('update-location',{
            userId: captain._id,
            location:{
              ltd: positon.coords.latitude,
              lng: positon.coords.longitude
            }
          })
        })
      }
    }

  // const locationupdate = setInterval(updateLocation, 10000)
  updateLocation()
  // return ()=> clearInterval(locationupdate)

  },[])

  socket.on('new-ride',data=>{
    setRideDetail(data)
    setRidePopUp(true)
  })

  useGSAP(
    function () {
      if (ridePopUp) {
        gsap.to(ridePopUpRef.current, { transform: "translatey(0)" });
      } else {
        gsap.to(ridePopUpRef.current, { transform: "translatey(100%)" });
      }
    },
    [ridePopUp]
  );
  useGSAP(
    function () {
      if (confirmRidePopUp) {
        gsap.to(ConfirmRidePopUpRef.current, { transform: "translatey(0)" });
      } else {
        gsap.to(ConfirmRidePopUpRef.current, { transform: "translatey(100%)" });
      }
    },
    [confirmRidePopUp]
  );

  const confirmed = async() =>{

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
      rideId: rideDetail._id,},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

  }
  return (
    <div className="h-screen w-screen">
      <div className="fixed p-4 flex items-center justify-between">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="fixed h-10 w-10 rounded-full bg-white flex items-center justify-center right-0 m-5"
        >
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div ref={ridePopUpRef} className="fixed z-10 w-full bottom-0 px-3 py-8 bg-white">
        <RidePopUp setRidePopUp={setRidePopUp} setConfirmRidePopUp={setConfirmRidePopUp} ride={rideDetail} confirmed={confirmed} />
      </div>
      <div ref={ConfirmRidePopUpRef} className="fixed z-10 w-full h-screen translate-y-full bottom-0 px-3 py-8 bg-white">
        <ConfirmRidePopUp setConfirmRidePopUp={setConfirmRidePopUp} ride={rideDetail} setRidePopUp={setRidePopUp}/>
      </div>
    </div>
  );
};

export default CaptainHome;
