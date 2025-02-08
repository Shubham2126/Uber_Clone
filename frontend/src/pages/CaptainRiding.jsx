import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinsihRide from "../components/FinsihRide";
import LiveTracking from "../components/LiveTracking";



const CaptainRiding = () => {
  const location = useLocation()
  const rideData = location.state?.ride
  const [finishRidePanel, setFinsishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {transform: "translatey(0)" });
      } else {
        gsap.to(finishRidePanelRef.current, { transform: "translatey(100%)" });
        
  
      }
    },
    [finishRidePanel]
  );
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
      <div className="h-4/5">
       <LiveTracking/>
      </div>
      <div onClick={()=>setFinsishRidePanel(true)}
        className="h-1/5 p-6 bg-yellow-400 flex justify-between items-center"
      >
       
          <h4 className="text-xl font-semibold">4 Km away</h4>
          <button className="bg-green-700 text-white px-8 py-2 rounded-lg font-semibold text-center">
            Complete Ride
          </button>
       
      </div>
      <div ref={finishRidePanelRef}  className="fixed z-10 w-full bottom-0 px-3 py-8 translate-y-full bg-white">
          <FinsihRide rideData={rideData} setFinsishRidePanel={setFinsishRidePanel}/>
        </div>

    </div>
  );
};

export default CaptainRiding;
