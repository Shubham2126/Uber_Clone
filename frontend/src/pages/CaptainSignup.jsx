import React, { useState, useContext } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState(0);
  const [vehicleType, setVehicleType] = useState("auto");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      fullname: { firstname: firstname, lastname: lastname },
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);
    if(response.status === 201){
      const data = response.data;
      console.log(data);
      localStorage.setItem("token", JSON.stringify(data.token));
      setCaptain(data.captain);
      navigate("/captain-home");
    }


    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity(0);
    setVehicleType("auto");
  };

  return (
    <div className="p-8 h-screen flex flex-col justify-between ">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-base font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-4">
            <input
              value={firstname}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="w-1/2 bg-[#eeeeee] px-4 py-2 text-sm border rounded"
              type="text"
              required
              placeholder="First name"
            ></input>
            <input
              value={lastname}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="w-1/2 bg-[#eeeeee] px-4 py-2 text-sm border rounded"
              type="text"
              required
              placeholder="Last name"
            ></input>
          </div>
          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full bg-[#eeeeee] mb-4 px-4 py-2 text-sm border rounded"
            type="email"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-base font-medium mb-2">What's your password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full bg-[#eeeeee] mb-4 px-4 py-2 text-sm border rounded"
            type="password"
            required
            placeholder="password"
          />
          <h3 className="text-base font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-4">
            <input
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
              className="w-full bg-[#eeeeee] px-4 py-2 text-sm border rounded"
              type="text"
              required
              placeholder="Vehicle Color"
            />
            <input
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
              className="w-full bg-[#eeeeee] px-4 py-2 text-sm border rounded"
              type="text"
              required
              placeholder="Vehicle Plate"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <input
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
              className="w-full bg-[#eeeeee] px-4 py-2 text-sm border rounded"
              type="number"
              required
              placeholder="Vehicle Capacity"
            />
            <select
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
              className="w-full bg-[#eeeeee] px-4 py-2 text-sm border rounded"
              required
            >
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
              <option value="car">Car</option>
            </select>
          </div>

          <button className="w-full bg-black text-white py-2 px-4 font-semibold rounded">
            Register
          </button>
        </form>
        <p className="text-center block mt-5 text-sm">
          Already have an account?
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>{" "}
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
