import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard";
import { toast } from "react-toastify";

const HotelHomePage = () => {
  const [hotelList, setHotelList] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchhotel = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/hotels`
        );
        const hotel = await response.json();
        setHotelList(hotel);
        // setIsLoading(false)
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchhotel();
  }, []);

  console.log(hotelList);
  const handleDetails = (id) => {
    navigate(`/hotel/${id}`); // Navigate to the hotel details page
  };

  const addHotel = () => {
    navigate("/add-hotel");
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="gap-4 justify-center flex flex-row flex-wrap items-center mx-36 mt-4 ">
          {hotelList.map((hotel, id) => (
            <div
              key={id}
              className="border shadow-lg rounded-lg p-6 flex gap-6 mb-6 w-full "
            >
              <HotelCard hotel={hotel} handleDetails={handleDetails} />
            </div>
          ))}
        </div>
      )}

      <button onClick={() => addHotel()}>Add Hotel</button>
    </>
  );
};

export default HotelHomePage;
