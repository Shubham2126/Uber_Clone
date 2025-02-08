import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-bottom bg-[url(https://plus.unsplash.com/premium_photo-1737012422783-590bdd55f7e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-10 w-full flex justify-between flex-col">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white pb-8 px-4 py-4">
          <h1 className="text-3xl font-bold">Get started with Uber</h1>
          <Link
            to="/user-login"
            className="flex justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
             </div>
      </div>
    </div>
  );
};

export default Start;  
