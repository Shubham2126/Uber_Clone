import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";    
import { socketDataContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {socket}= useContext(socketDataContext)
  const ride = location.state?.ride
  socket.on('end-ride', ()=>{
    navigate('/home')
  })
  return (
    <div className="h-screen">
      <Link to='/home' className="fixed h-10 w-10 rounded-full bg-white flex items-center justify-center right-0 m-5">
        <i className="text-lg font-bold ri-home-4-line"></i>
      </Link>
      <div className="h-1/2">
       <LiveTracking/>
      </div>
      <div className="h-1/2 p-4">
        <div className="flex gap-2 items-center justify-between flex-col">
          <div className="w-full flex items-center justify-between gap-6 p-3 border-b-2">
            <img
              className="h-16 z-20 rounded-full bg-gray-200"
              src="https://icon-library.com/images/user-icon-png-transparent/user-icon-png-transparent-17.jpg"
              alt=""
            />
            <img
              className="h-16 absolute ml-4"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
              alt=""
            />
            <div>
              <h2 className="text-lg font-medium">{ride?.captain.fullname.firstname}</h2>
              <h4 className="text-xl font-semibold -my-1 ">{ride?.captain.plate}</h4>
              <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex item-center gap-6 p-3 border-b-2">
              <i className="text-lg ri-map-pin-user-fill"></i>

              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm text-gray-600">{ride?.destination}</p>
              </div>
            </div>

            <div className="flex item-center gap-6 p-3">
              <i className="text-lg ri-cash-line"></i>

              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                <p className="text-sm text-gray-600">Cash</p>
              </div>
            </div>
          </div>
          <button className="bg-green-600 text-white p-2 rounded-lg w-full text-lg font-semibold">
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
