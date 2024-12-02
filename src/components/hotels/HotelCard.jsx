import React, { useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import { AuthContext } from "../../context/AuthContext";

const HotelCard = ({ hotel, handleDetails }) => {
  const { userRole } = useContext(AuthContext);
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
      {/* Carousel Column */}
      <div className="md:w-1/2 w-full border rounded-lg overflow-hidden">
        <Carousel showArrows={true} showIndicators={true} showThumbs={false}>
          {hotel?.images?.map((image, index) => (
            <div key={index} className="h-64">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                alt={`HotelImage ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Details Column */}
      <div className="md:w-3/4 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {hotel?.hotelname}
          </h2>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-xl text-gray-800 my-2">{hotel?.address}</span>
        </div>

        <p className="text-gray-600 mt-1 text-md font-semibold md:text-base md:mb-4">
          {hotel?.description?.length > 100
            ? `${hotel.description.slice(0, 100)}...`
            : hotel?.description}
        </p>
      </div>
      <div className="flex items-center justify-between md:w-1/2 ">
        {userRole === "admin" && (
          <>
            <button
              className="text-slate-600 font-bold text-lg hover:text-slate-800
            md:mt-52"
              // onClick={() => handleDetails(hotel?._id)}
            >
              Edit
            </button>
            <button
              className="text-slate-600 font-bold text-lg hover:text-slate-800
            md:mt-52"
            >
              Delete
            </button>
          </>
        )}
        <button
          className=" text-slate-600 font-bold text-lg hover:text-slate-800 md:mt-52"
          onClick={() => handleDetails(hotel?._id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
