import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaUserAlt,
  FaRupeeSign,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import { useLocation } from "react-router-dom";

function BookingForm() {
  const { state } = useLocation(); // Get the state passed via navigate
  console.log("State from location:", state);

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1,
    firstName: "",
    lastName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [selectedRoom, setSelectedRoom] = useState({
    roomType: "Double",
    price: 4500,
    roomDescription: "A spacious double room with modern amenities.",
    amenities: ["WiFi", "Air Conditioning", "Mini Bar", "TV"],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission here
  };

  return (
    <div className="flex justify-center items-center mx-auto">
      <div className="p-6 w-1/2 space-y-8">
        {/* Room Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-bold text-gray-600 pb-4 border-b-2">
            PROPERTY INFO
          </h2>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-gray-700">Room Type:</span>
            <span className="text-purple-700">{selectedRoom.roomType}</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-gray-700">
              Price per Night:
            </span>
            <span className="text-orange-600">
              <FaRupeeSign className="inline-block" /> {selectedRoom.price}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Room Description:
            </h3>
            <p className="text-gray-600">{selectedRoom.roomDescription}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Amenities:</h3>
            <ul className="space-y-2 text-gray-600">
              {selectedRoom.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span>✔️</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

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
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                  value={formData.rooms}
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
                  value={formData.guests}
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
                    value={formData.firstName}
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
                    value={formData.lastName}
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
                    value={formData.contactEmail}
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
                    value={formData.contactPhone}
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
              className=" w-full border-2 rounded-lg py-2 px-6 text-lg border-orange-300 font-bold text-orange-600
               hover:bg-orange-600 hover:text-white "
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
