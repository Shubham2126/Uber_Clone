import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  {UserDataContext}  from "../context/UserContext";

const WrapperProtectUser = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/user-login");
      });
  }, [token]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default WrapperProtectUser;
