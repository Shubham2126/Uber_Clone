import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import WrapperProtectUser from "./pages/WrapperProtectUser";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import WrapperProtectCaptain from "./pages/WrapperProtectCaptain";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-riding" element={<CaptainRiding/>}/>
        <Route
          path="/home"
          element={
            <WrapperProtectUser>
              <Home />
            </WrapperProtectUser>
          }
        />
        <Route
          path="/captain-home"
          element={
            <WrapperProtectCaptain>
              <CaptainHome />
            </WrapperProtectCaptain>
          }
        />
        <Route
          path="/user-logout"
          element={
            <WrapperProtectUser>
              <UserLogout />
            </WrapperProtectUser>
          }
        />
        <Route
          path="/captain-logout"
          element={
            <WrapperProtectCaptain>
              <CaptainLogout />
            </WrapperProtectCaptain>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
