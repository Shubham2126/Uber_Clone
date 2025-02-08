/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      userData
    );
    if (response.status === 201) {
      const data = response.data;
      console.log(data);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    setFirstName("");
    setLastName("");
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
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-5">
            <input
              value={firstname}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="w-1/2 bg-[#eeeeee] px-4 py-2 text-base border rounded"
              type="text"
              required
              placeholder="First name"
            ></input>
            <input
              value={lastname}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="w-1/2 bg-[#eeeeee] px-4 py-2 text-base border rounded"
              type="text"
              required
              placeholder="Last name"
            ></input>
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full bg-[#eeeeee] mb-5 px-4 py-2 text-base border rounded"
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
            className="w-full bg-[#eeeeee] mb-5 px-4 py-2 text-base border rounded"
            type="password"
            required
            placeholder="password"
          />
          <button className="w-full bg-black text-white py-2 px-4 font-semibold rounded">
            Register
          </button>
        </form>
        <p className="text-center block mt-5">
          Already have an account?
          <Link to="/user-login" className="text-blue-600">
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

export default SignUp;
