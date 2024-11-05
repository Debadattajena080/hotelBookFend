import React from "react"; 
import { Carousel } from "react-responsive-carousel";

import { TbStarFilled } from "react-icons/tb";
import { IoWifi } from "react-icons/io5";
import { IoIosTv } from "react-icons/io";
import { TbAirConditioning } from "react-icons/tb";
import { FaRupeeSign } from "react-icons/fa";
import { FaFire } from "react-icons/fa";

const HotelCard = ({ hotel, handleDetails }) => {
  return (
    <>
      <div className="relative flex-1 max-w-sm h-64 rounded-lg">
        <div>
          <Carousel showArrows={true} showIndicators={true} showThumbs={false}>
            {hotel.images.map((image, index) => (
              <div key={index} className="h-64 ">
                <img
                  src={`https://hotelbookfend.onrender.com/${image}`}
                  alt={`HotelImage ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Hotel Details Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {hotel.hotelname}
          </h2>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-2xl text-gray-800 ">{hotel.address}</span>
            <span className="flex items-start text-sm font-semibold text-red-600 gap-1">
              <FaFire  className="mt-1 text-md"/>
              <p>15 people booked this hotel today</p>
            </span>
          </div>

          <p className="text-gray-600 mt-1">
            {hotel.description.length > 100
              ? `${hotel.description.slice(0, 100)}...`
              : hotel.description}
          </p>
        </div>
        {/* amenities */}
        <div className="flex flex-col gap-0.5 mt-4">
          <div className="flex items-center">
            <TbStarFilled className="text-lg text-yellow-500" />
            <span className="text-slate-700 ml-1.5">5.0</span>
            <span className="text-slate-700 ml-1.5">(2000 Ratings)</span>
          </div>

          <div className="group my-1 inline-flex flex-wrap items-center gap-4">
            <span className="pointer-events-none text-center text-lg text-slate-800">
              <IoWifi />
            </span>

            <span className="pointer-events-none  text-center text-lg text-slate-800">
              <IoIosTv />
            </span>

            <span className=" pointer-events-none text-center text-lg text-slate-800">
              <TbAirConditioning />
            </span>

            <button className="text-slate-700 ml-2" type="button">
              + 20 more
            </button>
          </div>
        </div>
        <div className="flex justify-start flex-col mt-2">
          <div className="flex items-center">
            <FaRupeeSign className="text-2xl font-extrabold" />
            <span className="text-2xl font-extrabold">{hotel?.price}</span>
          </div>

          <div className=" flex justify-between">
            <div className="text-slate-700 text-sm flex items-center space-x-1">
              <p>+193 taxes and fees</p>
              <span className="text-xl">·</span>
              <p>per room per night</p>
            </div>

            <div className="space-x-12 mr-4 text-slate-600  font-bold text-lg">
              <button
                className="hover:text-slate-800"
                onClick={() => handleDetails(hotel?._id)}
              >
                View Details
              </button>
              <button className="hover:text-slate-800">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelCard;
