import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const FinsihRide = (props) => {
  const navigate = useNavigate()
  const handleSubmit = async()=>{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
      rideId: props.rideData._id
    },
  {
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  if(response.status == 200){
    props.setFinsishRidePanel(false)
    navigate('/captain-home')
  }
  }
  return (
    <div>
      <h5
        onClick={() => {props.setFinsishRidePanel(false)}}
        className="w-full flex items-center justify-center absolute top-0 text-2xl p-1"
      >
        <i className="ri-arrow-down-wide-line text-gray-300"></i>
      </h5>
      <h3 className="text-xl font-semibold mb-5">Finish this ride</h3>
      <div className="flex gap-2 items-center justify-between flex-col">
        <div className="flex justify-between p-4 bg-yellow-200 rounded-xl w-full items-center">
          <div className="flex items-center gap-2 ">
            <img
              className="h-10 w-10 object-cover "
              src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Background-Clip-Art.png"
              alt=""
            />
            <h4 className="text-lg font-semibold">{props.rideData?.user.fullname.firstname}</h4>
          </div>
          <h5 className="text-m font-medium">2.2 KM</h5>
        </div>
        <div className="w-full">
          <div className="flex item-center gap-6 p-3 border-b-2">
            <i className="text-lg ri-user-location-fill"></i>

            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.rideData?.pickup}</p>
            </div>
          </div>

          <div className="flex item-center gap-6 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>

            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.rideData?.destination}</p>
            </div>
          </div>
          <div className="flex item-center gap-6 p-3 border-b-2">
            <i className="text-lg ri-cash-line"></i>

            <div>
              <h3 className="text-lg font-medium">{props.rideData?.fare}</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 w-full mt-5">
          <button 
            onClick={handleSubmit}
            className=" bg-green-700 text-white p-2 w-full rounded-lg font-semibold text-center"
          >
            Complete Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinsihRide;
