import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import AminityIcons from "../../utility/AminityIcons";
import RoomModal from "./RoomModal";
import { FaRupeeSign } from "react-icons/fa6";

// Helper function to get the icon component based on the amenity name
const getAmenityIcon = (amenity) => {
  const normalizedAmenity = amenity.toLowerCase().replace(/\s+/g, "");
  const Icon = AminityIcons[normalizedAmenity];
  return Icon || null;
};

const RoomDetails = ({ rooms }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [amenitiesWithIcons, setAmenitiesWithIcons] = useState([]);

  const handleViewMore = (room) => {
    const amenitiesWithIcons = room.amenities.map((amenity) => ({
      name: amenity,
      icon: getAmenityIcon(amenity),
    }));
    setSelectedRoom(room);
    setAmenitiesWithIcons(amenitiesWithIcons);
    setShowModal(true);
  };

  useEffect(() => {
    // Disable scrolling when modal is open
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <div className="mt-4">
      {rooms?.map((room, roomIndex) => (
        <div
          key={roomIndex}
          className="room-details border-blue-200 border-b-4 pb-5"
        >
          <h2 className="font-bold text-gray-600 text-lg my-3">
            {room.roomType} Room
          </h2>
          <div className="flex">
            <div className="w-1/2 border rounded-lg overflow-hidden">
              <Carousel
                showArrows={true}
                showIndicators={true}
                showThumbs={false}
              >
                {room?.roomimages?.map((image, index) => (
                  <div key={index} className="h-64">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                      alt={`roomImage ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="w-2/3 mx-8">
              <div>
                <p className="text-gray-600 mt-1 text-md font-semibold md:text-base md:mb-4">
                  {room?.roomDescriptions?.length > 100
                    ? `${room.roomDescriptions.slice(0, 300)}   ...`
                    : room.roomDescriptions}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap space-x-4">
                {room?.amenities?.slice(0, 3).map((amenity, index) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      {Icon ? (
                        <Icon className="text-gray-700 text-2xl" />
                      ) : (
                        <span>🚫</span>
                      )}
                      <span className="text-sm font-semibold text-green-600">
                        {amenity}
                      </span>
                    </div>
                  );
                })}
                {room?.amenities?.length > 3 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold ml-2 text-orange-700">
                      +{room.amenities.length - 3} more
                    </span>
                  </div>
                )}
              </div>

              <button
                className="font-bold text-sm text-blue-600 mt-3 "
                onClick={() => handleViewMore(room)}
              >
                View More Details
              </button>
            </div>
            <div className="w-1/4 flex flex-col justify-around items-center  border-l-4">
              <div className="mt-4">
                <h2 className="text-3xl flex items-center">
                  {" "}
                  <FaRupeeSign className="mr-1" />
                  {room.price}
                </h2>
                <span className="flex items-center mt-2">
                  +<FaRupeeSign className="mx-1 text-sm" />{" "}
                  <p className="text-sm font-semibold">892 taxes & fees</p>
                </span>
                <div>
                  <span className="text-md font-bold text-gray-600 mr-2">
                    1 Room
                  </span>
                  <span>per night</span>
                </div>
              </div>

              <button
                className="border-2 rounded-lg py-4 px-6 text-md border-orange-300 font-bold text-orange-600
               hover:bg-orange-600 hover:text-white "
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      ))}
      {showModal && (
        <RoomModal
          room={selectedRoom}
          amenitiesWithIcons={amenitiesWithIcons}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default RoomDetails;
