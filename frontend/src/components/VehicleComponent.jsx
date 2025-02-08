import React from "react";

const VehicleComponent = (props) => {
  return (
    <div>
      <h5
        onClick={() => props.setVehiclesPanel(false)}
        className="w-full flex items-center justify-center absolute top-0 text-2xl p-1"
      >
        <i className="ri-arrow-down-wide-line text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>
      <div
        onClick={() =>{ props.setConfirmRide(true)
            props.setVehiclesPanel(false)
            props.setVehicle("car")
        }
    }
        className="flex items-center justify-between p-5 border-2 mb-2 active:border-black rounded-xl overflow-hidden"
      >
        <img
          className="w-20 object-cover"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberGo
            <span>
              <i className="ri-user-fill ml-1"></i>
            </span>
            3
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs">Affordable, compact rides</p>
        </div>
        <h5 className="font-semibold text-xl">
        ₹{props.fare.car}</h5>
      </div>
      <div
        onClick={() =>{ props.setConfirmRide(true)
            props.setVehiclesPanel(false)
            props.setVehicle('motorcycle')
        }}
        className="flex items-center justify-between p-5 border-2 mb-2 active:border-black rounded-xl overflow-hidden"
      >
        <img
          className="w-20 object-cover"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberMoto
            <span>
              <i className="ri-user-fill ml-1"></i>
            </span>
            1
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs">Affordable, motorcycle rides</p>
        </div>
        <h5 className="font-semibold text-xl">
        ₹{props.fare.motorcycle}</h5>
      </div>
      <div
        onClick={() => { props.setConfirmRide(true)
            props.setVehiclesPanel(false)
            props.setVehicle('auto')
        }}
        className="flex items-center justify-between p-5 border-2 active:border-black rounded-xl overflow-hidden"
      >
        <img
          className="h-12 object-cover"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberAuto
            <span>
              <i className="ri-user-fill ml-1"></i>2
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs">Affordable, Auto rides</p>
        </div>
        <h5 className="font-semibold text-xl">
        ₹{props.fare.auto}</h5>
      </div>
    </div>
  );
};

export default VehicleComponent;
