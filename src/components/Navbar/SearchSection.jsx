import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SearchSection = () => {
  const [isRoomGuestOpen, setIsRoomGuestOpen] = useState(false);
  const [rooms, setRooms] = useState([{ id: 1, guests: 2 }]);
  const [today, setToday] = useState("");

  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state with query parameters
  const [searchData, setSearchData] = useState({
    destination: params.get("destination") || "",
    checkIn: params.get("checkIn") || "",
    checkOut: params.get("checkOut") || "",
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    setToday(formattedDate);

    const queryRooms = Number(params.get("rooms")) || 1;
    const queryGuests = Number(params.get("guests")) || 2;
    setRooms(
      Array.from({ length: queryRooms }, (_, i) => ({
        id: i + 1,
        guests: Math.ceil(queryGuests / queryRooms) || 1,
      }))
    );
  }, [params]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { id: rooms.length + 1, guests: 1 }]);
  };

  const handleGuestChange = (roomId, action) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              guests:
                action === "increment" && room.guests < 4
                  ? room.guests + 1
                  : action === "decrement" && room.guests > 1
                  ? room.guests - 1
                  : room.guests,
            }
          : room
      )
    );
  };

  const handleSearch = async () => {
    if (!searchData.destination) {
      navigate("/");
      return;
    }
    const totalGuests = rooms.reduce((total, room) => total + room.guests, 0);

    // Construct query parameters
    const queryParams = new URLSearchParams({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      rooms: rooms.length,
      guests: totalGuests,
    });

    navigate(`/search_results?${queryParams.toString()}`);

    // Optionally, fetch results from the backend
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/search_hotels`,
        {
          ...searchData,
          rooms: rooms.length,
          guests: totalGuests,
        }
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const isBookingPage = location.pathname.includes("book-room");
  if (isBookingPage) return null;

  return (
    <div className="bg-gray-100 py-4 px-4">
      <div className="container mx-auto ">
        <div className="flex gap-4 justify-between items-center">
          {/* Destination */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="destination"
              className="text-gray-700 mb-2 font-semibold"
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={searchData.destination}
              onChange={handleInputChange}
              placeholder="Enter destination"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Check-in */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="checkIn"
              className="text-gray-700 mb-2 font-semibold"
            >
              Check-in
            </label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={searchData.checkIn}
              min={today}
              max={searchData.checkOut}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Check-out */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="checkOut"
              className="text-gray-700 mb-2 font-semibold"
            >
              Check-out
            </label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={searchData.checkOut}
              min={searchData.checkIn || today}
              max={searchData.checkOut}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Rooms & Guests */}
          <div className="relative w-2/3">
            <label className="text-gray-700 text-sm mb-2 block  font-semibold">
              Rooms & Guests
            </label>
            <div
              onClick={() => setIsRoomGuestOpen(!isRoomGuestOpen)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none cursor-pointer flex items-center justify-between"
            >
              <span>
                {rooms.length} Room{rooms.length > 1 ? "s" : ""},{" "}
                {rooms.reduce((total, room) => total + room.guests, 0)} Guest
                {rooms.reduce((total, room) => total + room.guests, 0) > 1
                  ? "s"
                  : ""}
              </span>
            </div>

            {/* Dropdown for Rooms & Guests */}
            {isRoomGuestOpen && (
              <div className="absolute top-20 left-0 w-64 bg-white border border-gray-300 rounded-md shadow-lg p-4">
                <div className="flex items-center justify-between border-b-2 pb-2 mb-4 text-lg font-semibold px-3">
                  <span>Rooms</span>
                  <span>Guests</span>
                </div>
                {rooms.map((room, index) => (
                  <div
                    key={room.id}
                    className="flex items-center justify-between mb-4"
                  >
                    <span className="text-gray-700">Room {index + 1}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleGuestChange(room.id, "decrement")}
                        className={`px-2 py-1 border rounded-md text-gray-700 ${
                          room.guests === 1
                            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                            : "hover:bg-gray-200"
                        }`}
                        disabled={room.guests === 1}
                      >
                        -
                      </button>
                      <span>{room.guests}</span>
                      <button
                        onClick={() => handleGuestChange(room.id, "increment")}
                        className={`px-2 py-1 border rounded-md text-gray-700 ${
                          room.guests === 4
                            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                            : "hover:bg-gray-200"
                        }`}
                        disabled={room.guests === 4}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddRoom}
                  className="w-full text-right text-gray-700 hover:text-gray-900 pt-1 border-t-2 mt-3"
                >
                  Add Room
                </button>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 mt-6"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
