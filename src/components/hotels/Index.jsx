import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard";
import { toast } from "react-toastify";

const HotelHomePage = () => {
  const [hotelList, setHotelList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchhotel = async () => {
      try {
        const response = await fetch(
          "https://hotelbookbkend.onrender.com/api/hotels"
        );
        const hotel = await response.json();
        setHotelList(hotel);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchhotel();
  }, []);

  console.log(hotelList);
  const handleDetails = (id) => {
    navigate(`/hotel/${id}`); // Navigate to the hotel details page
  };

  return (
    <>
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
    </>
  );
};

export default HotelHomePage;
