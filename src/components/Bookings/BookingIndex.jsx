import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import LoadingPage from "../../utility/LoadingPage";

const BookingIndex = () => {
  const [bookingList, setBookingList] = useState([]);
  const [statusChanged, setStatusChange] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState(null); // For modal data
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/${userId}/all-bookings`
      )
      .then((response) => {
        setBookingList(response?.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [userId, statusChanged]);

  const handleStatusChange = (bookingId, newStatus) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/update-booking-status/${bookingId}`,
        {
          status: newStatus,
        }
      )
      .then(() => {
        setBookingList((prevList) =>
          prevList.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
        setStatusChange(!statusChanged);
      })
      .catch((error) => toast.error(error));
  };

  const handleHotelClick = async (hotelId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/hotels/${hotelId}/rooms`
      );
      setModalData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    }
  };

  console.log("Modal Data", modalData);

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  console.log("Booking list", bookingList);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">All Bookings</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Guest Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Hotel</th>
              <th className="px-4 py-2 border">Room Type</th>
              <th className="px-4 py-2 border">Check-in</th>
              <th className="px-4 py-2 border">Check-out</th>
              <th className="px-4 py-2 border">Guests</th>
              <th className="px-4 py-2 border">Rooms</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookingList.length > 0 ? (
              bookingList.map((booking, index) => (
                <tr key={booking._id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    {`${booking.firstName} ${booking.lastName}`}
                  </td>
                  <td className="px-4 py-2 border">{booking.contactEmail}</td>
                  <td className="px-4 py-2 border">{booking.contactPhone}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="text-blue-500 underline"
                      onClick={() => handleHotelClick(booking.hotelId?._id)}
                    >
                      {booking.hotelId?.hotelname || "N/A"}
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    {booking.roomId?.roomType || "N/A"}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{booking.guests}</td>
                  <td className="px-4 py-2 border">{booking.rooms}</td>
                  <td
                    className={`px-4 py-2 border ${
                      booking.status ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {booking.status ? "Confirmed" : "Pending"}
                  </td>
                  <td className="px-4 py-2 flex items-center justify-between">
                    {!booking.status && (
                      <button
                        onClick={() => handleStatusChange(booking._id, true)}
                        className="px-4 py-2 rounded-md text-white bg-green-500 mr-2"
                      >
                        Confirm
                      </button>
                    )}
                    <button
                      onClick={() => handleStatusChange(booking._id, false)}
                      className="px-4 py-2 rounded-md text-white bg-red-500"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center px-4 py-2 border">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            {Array.isArray(modalData) && modalData.length > 0 ? (
              modalData?.map((room, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-bold mb-2">
                    {room?.roomType || "N/A"}
                  </h3>
                  <p>Total Rooms: {room?.totalRoom || "N/A"}</p>
                  <p>Booked Rooms: {room?.bookedRooms || "N/A"}</p>
                  <p>
                    Available Rooms:{" "}
                    {room?.totalRooms - room?.bookedRooms >= 0
                      ? room?.totalRooms - room?.bookedRooms
                      : "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No room details available.</p>
            )}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingIndex;
