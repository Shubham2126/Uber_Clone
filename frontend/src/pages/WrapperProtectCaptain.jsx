import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const WrapperProtectCaptain = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token]);
  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
};

export default WrapperProtectCaptain;
