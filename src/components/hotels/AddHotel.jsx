import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddHotel = () => {
  const [newHotel, setNewHotel] = useState({
    hotelname: "",
    description: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    // price: "",
  });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewHotel({ ...newHotel, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert to array
    setImages(selectedFiles); // Set the images state as an array
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formDataa = new FormData();
    formDataa.append("hotelname", newHotel.hotelname);
    formDataa.append("description", newHotel.description);
    formDataa.append("address", newHotel.address);
    formDataa.append("city", newHotel.city);
    formDataa.append("phone", newHotel.phone);
    formDataa.append("email", newHotel.email);
    // formDataa.append("price", newHotel.price);

    for (let i = 0; i < images.length; i++) {
      formDataa.append("uploadImages", images[i]);
    }

    axios
      .post("http://localhost:8080/api/add-hotel", formDataa, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        navigate("/");
        toast.success("Hotel added Successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="w-full">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        method="POST"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <section className="bg-white">
          <div className="py-8 px-2 mx-auto max-w-2xl lg:py-12">
            <h2 className="mb-4 text-xl font-bold">Add a new Hotel</h2>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="hotelname"
                  className="block mb-2 text-sm font-medium"
                >
                  Hotel Name
                </label>
                <input
                  type="text"
                  name="hotelname"
                  id="hotelname"
                  className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type hotel name"
                  required
                  value={newHotel.hotelname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                  required
                  value={newHotel.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter E-mail"
                  required=""
                  value={newHotel.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="1234512345"
                  required=""
                  value={newHotel.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter Address"
                  required=""
                  value={newHotel.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter City"
                  required
                  value={newHotel.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="uploadImages"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Upload Images
                </label>
                <input
                  type="file"
                  name="uploadImages"
                  id="uploadImages"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                  onChange={handleImageChange} // Handle file input change
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-primary-300 rounded-lg focus:ring-4 
                focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add Hotel
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddHotel;
