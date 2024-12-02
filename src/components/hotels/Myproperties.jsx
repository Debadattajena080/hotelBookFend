import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import HotelCard from "./HotelCard";
import { useNavigate } from "react-router-dom";
// import HotelCard from "./HotelCard";

const Myproperties = () => {
  const [myproperties, setMyproperties] = useState();

  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}/myproperties`
        );
        const data = await response.json();
        setMyproperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties(); // Call the async function
  }, [userId]);

  const handleDetails = (id) => {
    navigate(`/hotel/${id}`);
  };

  console.log("Myproperties", myproperties);

  return (
    <div>
      <div className=" gap-4 justify-center flex flex-row flex-wrap items-center mx-36 mt-4 ">
        {myproperties?.map((myproperty, id) => (
          <div
            key={id}
            className="border shadow-lg rounded-lg p-6 flex gap-6 mb-6 w-full bg-white"
          >
            <HotelCard hotel={myproperty} handleDetails={handleDetails} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myproperties;
