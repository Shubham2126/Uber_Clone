import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import "remixicon/fonts/remixicon.css";
import VehicleComponent from "../components/VehicleComponent";
import ConfirmRide from "../components/ConfirmRide";
import LookingDriver from "../components/LookingDriver";
import WaitingDriver from "../components/WaitingDriver";
import { UserDataContext } from "../context/UserContext";
import { socketDataContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";


function Home() {
  const navigate = useNavigate()
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [suggestions, setSuggestions] = useState(false);
  const [vehiclesPanel, setVehiclesPanel] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [lookingDriver, setLookingDriver] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestion, setDropSuggestion] = useState([]);
  const [ride, setRide] = useState();
  const {user} = useContext(UserDataContext)
  const {socket} = useContext(socketDataContext)
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicle ,setVehicle] =useState("")
  const panelref = useRef(null);
  const closePanel = useRef(null);
  const vehicleRef = useRef(null);
  const ConfirmRideRef = useRef(null);
  const LookingDriverRef = useRef(null);
  const WaitingDriverRef = useRef(null);


  useEffect(()=>{
    socket.emit('join',{userType: 'user', userId: user._id })
  },[user])

  socket.on('ride-confirmed', data=>{
    setRide(data)
    setLookingDriver(false)
    setWaitingForDriver(true)
  })

  socket.on('ride-started', data=>{
    navigate('/riding',{state:{ride: ride}})
  })

  

  const handleDestination = async (e) => {
    const input = e.target.value;
    setDrop(input);
    // if (input.length<3) {
    //   setDropSuggestion([]);
    //   return
    // }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDropSuggestion(response.data);
    } catch (error) {}
  };
  const handlePickup = async (e) => {
    const input = e.target.value;
    setPickup(input);
    // if (input.length<3) {
    //   setPickupSuggestions([]);
    //   return
    // }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: input },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (error) { }
  };

    
  useGSAP(
    function () {
      if (suggestions) {
        gsap.to(panelref.current, { height: "70%", padding: "24px" });
        gsap.to(closePanel.current, { opacity: 1 });
      } else {
        gsap.to(panelref.current, { height: '0%', padding: 0 });
        gsap.to(closePanel.current, { opacity: 0 });
      }
    },
    [suggestions]
  );
  useGSAP(
    function () {
      if (vehiclesPanel) {
        gsap.to(vehicleRef.current, { transform: "translatey(0)" });
      } else {
        gsap.to(vehicleRef.current, { transform: "translatey(100%)" });
      }
    },
    [vehiclesPanel]
  );
  useGSAP(
    function () {
      if (confirmRide) {
        gsap.to(ConfirmRideRef.current, { transform: "translatey(0)" });
      } else {
        gsap.to(ConfirmRideRef.current, { transform: "translatey(100%)" });
      }
    },
    [confirmRide]
  );
  useGSAP(
    function () {
      if (lookingDriver) {
        gsap.to(LookingDriverRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(LookingDriverRef.current, { transform: "translateY(100%)" });
      }
    },
    [lookingDriver]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(WaitingDriverRef.current, { transform: "translatey(0)" });
      } else {
        gsap.to(WaitingDriverRef.current, { transform: "translatey(100%)" });
      }
    },
    [waitingForDriver]
  );

  const findTrip = async () => {
    setVehiclesPanel(true);
    setSuggestions(false); 
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/getfare`,
        {
          params: {
            pickup: pickup,
            destination: drop,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data);
      console.log(response.data);
  };
  async function createRide() {

    const ride = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup: pickup,
        destination: drop,
        vehicleType: vehicle,
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      
    ) 
  }

  return (
    <>
      <div className="h-screen w-screen relative overflow-hidden">
        <img
          className="w-16 left-5 top-5 absolute"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div
          onClick={() => setVehiclesPanel(false)}
          className="h-screen w-screen"
        >
        <LiveTracking/>
        </div>
        <div className="flex flex-col justify-end h-screen w-full absolute top-0">
          <div className="h-[35%] p-5 bg-white relative">
            <h5
              ref={closePanel}
              onClick={() => setSuggestions(false)}
              className="text-2xl"
            >
              <i className="ri-arrow-down-wide-line absolute right-10"></i>
            </h5>
            <h4 className="text-3xl font-semibold">Find a trip</h4>
            <form className="relative py-3"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="line absolute h-16 w-1 rounded-lg left-10 top-[60%] -translate-y-1/2 bg-black"></div>
              <input className="w-full bg-[#eeee] rounded-lg px-12 py-2 mt-5 text-base "
                  value={pickup}
                onClick={() => {
                  setSuggestions(true);
                  setActiveField("origin");
                }}
                onChange={handlePickup}
                    type="text"
                placeholder="Add a pickup location"
              />
              <input
                className="w-full bg-[#eeee] rounded-lg px-12 py-2 mt-3 text-base "
                value={drop}
                onClick={() => {
                  setSuggestions(true);
                  setActiveField("destiny");
                }}
                onChange={handleDestination}
                type="text"
                placeholder="Enter your drop location"
              />
            </form>
            <button
              onClick={findTrip}
              className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
            >
              Find Trip
            </button>
          </div>
          <div ref={panelref} className="bg-white ">
            <LocationSearchPanel
              location={
                activeField === "origin" ? pickupSuggestions : dropSuggestion
              }
              setVehiclesPanel={setVehiclesPanel}
              activeField={activeField}
              setPickup={setPickup}
              setDrop={setDrop}
            />
          </div>
        </div>
        <div
          ref={vehicleRef}
          className="fixed z-10 w-full bottom-0 px-3 py-8 translate-y-full bg-white"
        >
          <VehicleComponent
            fare={fare}
            setVehicle={setVehicle}
            setVehiclesPanel={setVehiclesPanel}
            setConfirmRide={setConfirmRide}
          />
        </div>
        <div
          ref={ConfirmRideRef}
          className="fixed z-10 w-full bottom-0 px-3 py-8 translate-y-full bg-white"
        >
          <ConfirmRide
            pickup={pickup}
            drop={drop}
            fare={fare}
            vehicle={vehicle}
            setConfirmRide={setConfirmRide}
            setLookingDriver={setLookingDriver}
            createRide={createRide}
            
          />
        </div>
        <div
          ref={LookingDriverRef}
          className="fixed z-10 w-full bottom-0 px-3 py-8 translate-y-full bg-white"
        >
          <LookingDriver
          
            pickup={pickup}
            drop={drop}
            fare={fare}
            vehicle={vehicle}
           setLookingDriver={setLookingDriver} />
        </div>
        <div
          ref={WaitingDriverRef}
          className="fixed z-10 w-full bottom-0 px-3 py-8 bg-white"
        >
          <WaitingDriver
           ride={ride}     
           setWaitingForDriver={setWaitingForDriver} />
   </div>
      </div>
    </>
  );
}

export default Home;
