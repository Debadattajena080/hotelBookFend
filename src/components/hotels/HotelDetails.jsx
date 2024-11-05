// HotelDetails.js
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import MyMapComponent from "../GoogleMap/GoogleMap";

import { FaInfo } from "react-icons/fa";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/hotels/${id}`);
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  return (
    <div className="mx-36 mt-4">
      <div>
        <div className="relative">
          <Carousel
            showArrows={true}
            showIndicators={true}
            showThumbs={true}
            centerMode={true}
            centerSlidePercentage={40}
          >
            {hotel?.images?.map((image, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-full"
              >
                <img
                  src={`http://localhost:8080/${image}`}
                  alt={`HotelImage ${index + 1}`}
                  className="object-cover w-full h-full "
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-semibold mb-2 mt-6">{hotel?.hotelname}</h1>
        <p className="text-gray-500 text-2xl">{hotel?.address}</p>
      </div>

      {/* Amenities */}

      <div>
        <h2 className="text-2xl font-semibold mb-2 mt-6">Amenities </h2>
      </div>

      {/* About this Hotel */}

      <div>
        <h2 className="text-2xl font-semibold mb-2 mt-6">About this Hotel</h2>
        <p className="text-md mb-2">{hotel?.description}</p>
      </div>

      {/* choose your room */}

      <div>
        <h2 className="text-2xl font-semibold mb-2 mt-6">Choose your room</h2>
      </div>

      {/* Hotel Policies  */}

      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Hotel Policies
        </h2>

        {/* <!-- Check-in and Check-out times --> */}
        <div className="flex items-center text-gray-700 text-lg font-medium my-4">
          <span>Check-In</span>
          <span className="mx-4 text-gray-400">|</span>
          <span>Check-Out</span>
        </div>

        {/* <!-- Policies List --> */}
        <div>
          <ul className="space-y-3 text-gray-900 text-md">
            <li className="flex items-start">
              <FaInfo className="text-sm text-green-500 rounded-full mt-1 mr-2 " />
              <p> Outside food is not allowed.</p>
            </li>
            <li className="flex items-start">
              <FaInfo className="text-sm text-green-500 rounded-full mt-1 mr-2 " />
              Couples are welcome.
            </li>
            <li className="flex items-start">
              <FaInfo className="text-sm text-green-500 rounded-full mt-1 mr-2 " />
              Guests can check in using any local or outstation ID proof (PAN
              card not accepted).
            </li>
            <li className="flex items-start">
              <FaInfo className="text-sm text-green-500 rounded-full mt-1 mr-2 " />
              Only Indian Nationals allowed.
            </li>
          </ul>
        </div>
      </div>
      <div>
        <MyMapComponent address={hotel?.address} />
      </div>

      <p className="text-gray-500">Price: ${hotel?.price}</p>
      <p className="text-gray-500">
        Contact: {hotel?.email} | {hotel?.phone}
      </p>
    </div>
  );
};

export default HotelDetails;
