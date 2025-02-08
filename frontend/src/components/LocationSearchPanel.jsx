import React from "react";

const LocationSearchPanel = ({location,activeField, setDrop, setPickup}) => {
    const handleLocation =(location) =>{
      if(activeField === 'origin'){
        setPickup(location)
      }else if(activeField === 'destiny'){
        setDrop(location)
      }
    }

  return (
    <div>
      {location.map((value, idx) => {
        return (
          <div
            onClick={()=>handleLocation(value.description)}
            key={idx}
            className="flex items-center gap-5 justify-start p-2 border-gray-50 border-2 mb-2 active:border-black rounded-xl overflow-hidden"
          >
            <h5 className="bg-gray-200 rounded-full h-10 w-10 shrink-0 flex items-center justify-center">
              <i className="ri-map-pin-fill text-base"></i>
            </h5>
            <h5>{value.description}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
