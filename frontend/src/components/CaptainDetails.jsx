import React, {useContext} from "react";
import { CaptainDataContext } from "../context/CaptainContext";


const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex justify-start gap-2 items-center">
          <img
            className="h-10 w-10 object-cover rounded-full"
            src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Background-Clip-Art.png"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname+" "+ captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">$500.50</h4>

          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex justify-center p-4 bg-gray-100 rounded-xl mt-4 gap-5 items-start">
        <div className="text-center">
          <i className="text-2xl font-thin ri-timer-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-thin ri-sticky-note-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours online</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
