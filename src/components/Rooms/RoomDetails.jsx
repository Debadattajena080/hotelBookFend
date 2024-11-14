import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import AminityIcons from "../../utility/AminityIcons";
import RoomModal from "./RoomModal";

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
    <div>
      <p>Total Rooms: {rooms?.length}</p>
      {rooms?.map((room, roomIndex) => (
        <div
          key={roomIndex}
          className="room-details border-blue-200 border-b-4 pb-5"
        >
          <h2 className="font-bold text-gray-600 text-lg my-3">
            {room.roomType} Room
          </h2>
          <div>
            <div className="w-1/3 border rounded-lg overflow-hidden">
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
            <button
              className="font-bold text-sm text-blue-600 mt-3"
              onClick={() => handleViewMore(room)}
            >
              View More Details
            </button>
            <div className="mt-3 flex flex-wrap space-x-4">
              {room?.amenities?.map((amenity, index) => {
                const Icon = getAmenityIcon(amenity);
                return (
                  <div key={index} className="flex items-center space-x-2">
                    {Icon ? (
                      <Icon className="text-gray-700 text-2xl" />
                    ) : (
                      <span>🚫</span>
                    )}
                    <span className="text-gray-700 text-sm font-semibold">
                      {amenity}
                    </span>
                  </div>
                );
              })}
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
