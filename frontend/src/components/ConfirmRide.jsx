import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        onClick={() => props.setConfirmRide(false)}
        className="w-full flex items-center justify-center absolute top-0 text-2xl p-1"
      >
        <i className="ri-arrow-down-wide-line text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your ride</h3>
      <div
        className="flex
      gap-2
      items-center
      justify-between
      flex-col"
      >
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
        />
        <div className="w-full">
          <div className="flex item-center gap-6 p-3 border-b-2">
            <i className="text-lg ri-user-location-fill"></i>

            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.pickup}</p>
            </div>
          </div>

          <div className="flex item-center gap-6 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>

            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.drop}</p>
            </div>
          </div>

          <div className="flex item-center gap-6 p-3">
            <i className="text-lg ri-cash-line"></i>

            <div>
              <h3 className="text-lg font-medium">₹{props.fare[props.vehicle]}</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() =>{
            props.createRide() 
            props.setConfirmRide(false)
            props.setLookingDriver(true)
          }}
          className="bg-green-700 text-white p-2 w-full rounded-lg font-semibold"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
