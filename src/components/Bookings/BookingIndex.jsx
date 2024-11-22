import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingIndex = () => {
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/all-bookings`)
      .then((response) => setBookingList(response.data))
      .catch((error) => console.log(error));
  }, []);

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
              <th className="px-4 py-2 border">Status</th>
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
                    {booking.hotelId?.hotelname || "N/A"}
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
                  <td
                    className={`px-4 py-2 border ${
                      booking.status ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {booking.status ? "Confirmed" : "Pending"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center px-4 py-2 border">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingIndex;
