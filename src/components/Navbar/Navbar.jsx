import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FaUserAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

import SearchSection from "./SearchSection";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const addHotel = () => {
    navigate("/add-hotel");
  };

  const allBookings = () => {
    navigate("/all-bookings");
  };

  return (
    <div className="md:w-5/6 mx-auto">
      {/* Navbar Section */}
      <div className="bg-gray-100 ">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a href="/" className="text-2xl text-red-600">
                <span className="mr-1 text-xl font-semibold text-gray-800">
                  book
                </span>
                <span className="p-2 bg-gray-900 text-white rounded-xl text-2xl font-bold shadow-lg">
                  MY
                </span>
                <span className="ml-1 text-xl font-semibold text-gray-800">
                  room
                </span>
              </a>
            </div>

            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => allBookings()}
                className="text-gray-600 hover:text-gray-900"
              >
                Bookings
              </button>
              <a href="/hotels" className="text-gray-600 hover:text-gray-900">
                Hotels
              </a>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => addHotel()}
              >
                Add Hotel
              </button>
            </nav>

            <div className="relative py-2 px-3 border rounded-lg border-gray-600">
              <button
                id="profile-menu"
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FaUserAlt className="w-5 h-5" />
                <span>LOGIN / SIGNUP</span>
                <MdKeyboardArrowDown className="font-bold text-xl" />
              </button>

              {isDropdownOpen && (
                <div
                  id="dropdown-menu"
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/bookings"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <SearchSection />
    </div>
  );
};

export default Navbar;
