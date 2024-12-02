import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import HotelCard from "./HotelCard";
import LoadingPage from "../../utility/LoadingPage";
import { useNavigate } from "react-router-dom";

const Myproperties = () => {
  const [myproperties, setMyproperties] = useState([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true); // Start loading state as true

  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}/myproperties`
        );
        const data = await response.json();

        // Only set data if it is an array
        if (Array.isArray(data)) {
          setMyproperties(data);
        } else {
          console.error("Expected an array of properties");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties(); // Call the async function
  }, [userId]);

  const handleDetails = (id) => {
    navigate(`/hotel/${id}`);
  };

  return (
    <div>
      <div className="gap-4 justify-center flex flex-row flex-wrap items-center mx-36 mt-4">
        {isLoading ? (
          <div>
            <LoadingPage />
          </div>
        ) : myproperties.length === 0 ? (
          <div className="text-center">No properties available.</div>
        ) : (
          myproperties.map((myproperty) => (
            <div
              key={myproperty._id} // Use _id for unique key
              className="border shadow-lg rounded-lg p-6 flex gap-6 mb-6 w-full bg-white"
            >
              <HotelCard hotel={myproperty} handleDetails={handleDetails} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Myproperties;
