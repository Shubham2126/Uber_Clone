import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { use } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );
    if (response.status === 201) {
      const data = response.data;
      console.log(data);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
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
          <Link to="/user-signup" className="text-blue-600">
            {" "}
            Sign up
          </Link>{" "}
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="w-full flex items-center justify-center bg-[#E1AD01] text-white mb-6 py-2 px-4 font-semibold rounded"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default Login;
