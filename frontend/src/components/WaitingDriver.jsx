import React from "react";

const WaitingDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => props.setWaitingForDriver(false)}
        className="w-full flex items-center justify-center absolute top-0 text-2xl p-1"
      >
        <i className="ri-arrow-down-wide-line text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Waiting for a Driver</h3>
      <div
        className="flex
      gap-2
      items-center
      justify-between
      flex-col"
      >
        <div className="w-full flex items-center justify-between gap-6 p-3 border-b-2">
          <img className="h-16 z-20 rounded-full bg-gray-200" src="https://icon-library.com/images/user-icon-png-transparent/user-icon-png-transparent-17.jpg" alt="" />
          <img className="h-16 absolute ml-4" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
          <div>
            <h2 className="text-lg font-medium">{props.ride?.captain.fullname.firstname}</h2>
            <h4 className="text-xl font-semibold -my-1 ">{props.ride?.captain.vehicle.plate}</h4>
            <h4 className="text-xl font-semibold -my-1 ">{props.ride?.otp}</h4>

            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>

          </div>
        </div>
        <div className="w-full">
          <div className="flex item-center gap-6 p-3 border-b-2">
            <i className="text-lg ri-user-location-fill"></i>

            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>

          <div className="flex item-center gap-6 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>

            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>

          <div className="flex item-center gap-6 p-3">
            <i className="text-lg ri-cash-line"></i>

            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingDriver;
