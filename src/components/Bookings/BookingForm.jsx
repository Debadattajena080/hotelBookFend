import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const BookingForm = () => {
  const { id } = useParams();
  const { roomId } = useParams();
  const [searchParams] = useSearchParams(); // This will get the query parameters from the URL

  const navigate = useNavigate();

  const [bookingFormData, setBookingFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1,
    firstName: "",
    lastName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    setToday(formattedDate);

    // Prefill form fields from the URL query parameters
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const rooms = searchParams.get("rooms");
    const guests = searchParams.get("guests");

    setBookingFormData((prevData) => ({
      ...prevData,
      checkIn: checkIn || "", // If checkIn is present in URL, use it, else set empty
      checkOut: checkOut || "",
      rooms: rooms || 1,
      guests: guests || 1,
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    setBookingFormData({ ...bookingFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/hotels/${id}/room/${roomId}/book-room`,
        bookingFormData
      );
      toast.success("Booking successful");
      navigate("/"); // Navigate after successful booking
    } catch (error) {
      toast.error("Failed to book room. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto">
      <div className="p-6 w-1/2 space-y-8">
        {/* Booking Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-600 pb-4 border-b-2">
            BOOKING DETAILS
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Check-in and Check-out Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="checkIn"
                  className="text-sm font-medium text-gray-700 flex items-center space-x-2"
                >
                  <FaCalendarAlt />
                  <span>Check-in Date:</span>
                </label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={bookingFormData.checkIn}
                  onChange={handleChange}
                  min={today}
                  max={bookingFormData.checkOut || ""}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none
                   focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="checkOut"
                  className="text-sm font-medium text-gray-700 flex items-center space-x-2"
                >
                  <FaCalendarAlt />
                  <span>Check-out Date:</span>
                </label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={bookingFormData.checkOut}
                  onChange={handleChange}
                  min={bookingFormData.checkIn || today}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500
                   focus:border-blue-500"
                />
              </div>
            </div>

            {/* Number of Rooms and Guests Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="rooms"
                  className="text-sm font-medium text-gray-700 flex items-center space-x-2"
                >
                  <FaUserAlt />
                  <span>Number of Rooms:</span>
                </label>
                <input
                  type="number"
                  id="rooms"
                  name="rooms"
                  min="1"
                  value={bookingFormData.rooms}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="guests"
                  className="text-sm font-medium text-gray-700 flex items-center space-x-2"
                >
                  <FaUserAlt />
                  <span>Number of Guests:</span>
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  value={bookingFormData.guests}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Guest Contact Details:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={bookingFormData.firstName}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter First Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={bookingFormData.lastName}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contactEmail"
                    className="text-sm font-medium text-gray-700 flex items-center space-x-2"
                  >
                    <MdOutlineEmail className=" text-xl" />
                    <span>Email:</span>
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={bookingFormData.contactEmail}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactPhone"
                    className="text-sm font-medium text-gray-700 flex items-center space-x-2"
                  >
                    <FaPhoneAlt />
                    <span>Phone:</span>
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={bookingFormData.contactPhone}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className=" w-full border-2 rounded-lg py-2 px-6 text-lg border-gray-300 font-bold text-gray-600
               hover:bg-gray-600 hover:text-white "
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
