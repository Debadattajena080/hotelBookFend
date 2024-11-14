import React from "react";
import { Carousel } from "react-responsive-carousel";
import { IoCloseSharp } from "react-icons/io5";

const RoomModal = ({ room, onClose, amenitiesWithIcons }) => {
  console.log("Room in modal", room);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-3/4 md:w-1/2 lg:w-1/2 p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-8 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoCloseSharp className="text-2xl font-bold" />
        </button>

        {/* Room Information */}
        <h2 className="text-2xl font-bold mb-6 border-b-2 pb-3">
          {room.roomType} Room Details
        </h2>

        <div className="w-full border rounded-lg ">
          <Carousel showArrows={true} showIndicators={true} showThumbs={false}>
            {room?.roomimages?.map((image, index) => (
              <div key={index} className="h-80">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                  alt={`roomImage ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </Carousel>
        </div>

        <p className="text-gray-700 mb-4">Capacity: {room.capacity}</p>
        <p className="text-gray-700 mb-4">Price: ${room.price}</p>

        <div className="font-bold text-2xl border-b-2 pb-3">About the Room</div>

        <p className="text-md font-semibold mt-2 text-gray-700">
          {room?.roomDescriptions}
        </p>

        <h3 className="text-2xl font-bold mb-2 mt-4 border-b-2 pb-3">
          Amenities:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3 mx-auto">
          {amenitiesWithIcons.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              {amenity.icon ? (
                <amenity.icon className="text-gray-700 text-2xl" />
              ) : (
                <span>🚫</span>
              )}
              <span className="text-gray-700 text-sm font-semibold">
                {amenity.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomModal;