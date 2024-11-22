import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className="bg-white shadow-md sticky top-0 z-50">
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

            <div className="hidden md:flex items-center flex-1 mx-6">
              <input
                type="text"
                placeholder="Search hotels, destinations..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-700">
                Search
              </button>
            </div>

            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="/hotels" className="text-gray-600 hover:text-gray-900">
                Hotels
              </a>
              <a href="/offers" className="text-gray-600 hover:text-gray-900">
                Offers
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <a href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md"
              >
                Sign Up
              </a>

              <div className="relative">
                <button
                  id="profile-menu"
                  onClick={toggleDropdown} // Toggle the dropdown visibility
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  <img
                    src="https://via.placeholder.com/40"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>Hi, User</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                {/* Conditional rendering of the dropdown */}
                {isDropdownOpen && (
                  <div
                    id="dropdown-menu"
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
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

            <button
              id="menu-toggle"
              className="md:hidden text-gray-600 hover:text-red-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div id="mobile-menu" className="hidden md:hidden">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Search hotels, destinations..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <a href="/" className="block text-gray-600 hover:text-red-600">
                Home
              </a>
              <a
                href="/hotels"
                className="block text-gray-600 hover:text-red-600"
              >
                Hotels
              </a>
              <a
                href="/offers"
                className="block text-gray-600 hover:text-red-600"
              >
                Offers
              </a>
              <a
                href="/login"
                className="block text-gray-600 hover:text-red-600"
              >
                Login
              </a>
              <a
                href="/signup"
                className="block bg-red-600 text-white text-center px-4 py-2 rounded-md"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
