import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/login`,
      captainData
    );
    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("token",data.token);
      setCaptain(data.captain);
      navigate("/captain-home");
    }
    setEmail("");
    setPassword("");
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
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full bg-[#eeeeee] mb-5 px-4 py-2 text-lg border rounded"
            type="email"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">What's your password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full bg-[#eeeeee] mb-5 px-4 py-2 text-lg border rounded"
            type="password"
            required
            placeholder="password"
          />
          <button className="w-full bg-black text-white py-2 px-4 font-semibold rounded">
            Login
          </button>
        </form>
        <p className="text-center block mt-5">
          Don't have an account?
          <Link to="/captain-signup" className="text-blue-600">
            {" "}
            Sign up
          </Link>{" "}
        </p>
      </div>
      <div>
        <Link
          to="/user-login"
          className="w-full flex items-center justify-center bg-[#10b461] text-white mb-6 py-2 px-4 font-semibold rounded"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
