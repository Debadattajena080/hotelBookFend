import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomType: "Classic",
    totalrooms: "",
    price: "",
    capacity: "",
    roomDescriptions: "",
    amenities: [],
  });
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log("params", id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  console.log("Form Data ", formData);

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      amenities: checked
        ? [...prevData.amenities, value]
        : prevData.amenities.filter((amenity) => amenity !== value),
    }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };
  console.log("Images ", images);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData for image and form data
    const RoomData = new FormData();
    RoomData.append("roomType", formData.roomType);
    console.log("roomtype", formData.roomType);
    RoomData.append("totalrooms", formData.totalrooms);
    RoomData.append("price", formData.price);
    RoomData.append("capacity", formData.capacity);
    RoomData.append("roomDescriptions", formData.roomDescriptions);

    formData.amenities.forEach((amenity) =>
      RoomData.append("amenities", amenity)
    );

    console.log(RoomData.amenities);

    for (let i = 0; i < images.length; i++) {
      RoomData.append("uploadImages", images[i]);
    }

    console.log("DATAS are", RoomData);

    axios
      .post(`http://localhost:8080/api/hotels/${id}/add-rooms`, RoomData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        navigate("/");
        toast.success("Room added Successfully");
      })
      .catch((error) => {
        console.error("Error adding room:", error);
      });
  };

  return (
    <>
      <div className="w-full">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <section className="bg-white">
            <div className="py-8 px-2 mx-auto max-w-2xl lg:py-12">
              <h2 className="mb-4 text-xl font-bold">Add a new room</h2>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label
                    htmlFor="roomtype"
                    className="block mb-2 text-sm font-medium"
                  >
                    Select Room Type
                  </label>
                  <select
                    name="roomType"
                    onChange={handleChange}
                    value={formData.roomType}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Classic">Classic</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Presidential">Presidential</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="totalRooms"
                    className="block mb-2 text-sm font-medium"
                  >
                    Total Rooms
                  </label>
                  <input
                    type="number"
                    name="totalrooms"
                    id="totalrooms"
                    className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                    block w-full p-2.5"
                    placeholder="Total number of rooms"
                    required
                    onChange={handleChange}
                    value={formData.totalrooms}
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                    block w-full p-2.5"
                    placeholder="Rs 2999"
                    required
                    onChange={handleChange}
                    value={formData.price}
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="capacity"
                    className="block mb-2 text-sm font-medium"
                  >
                    Capacity
                  </label>
                  <input
                    type="text"
                    name="capacity"
                    id="capacity"
                    className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                    block w-full p-2.5"
                    placeholder="Enter capacity per room"
                    required
                    onChange={handleChange}
                    value={formData.capacity}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="roomDescriptions"
                    className="block mb-2 text-sm font-medium"
                  >
                    Room Description
                  </label>
                  <textarea
                    id="roomDescriptions"
                    name="roomDescriptions"
                    rows="4"
                    className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write about the room"
                    required
                    value={formData.roomDescriptions}
                    onChange={handleChange}
                  ></textarea>
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
                    onChange={handleImageChange}
                  />
                </div>

                {/* Amenities Section */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      "Free WiFi",
                      "Air Conditioning",
                      "Swimming Pool",
                      "Gym",
                      "Room Service",
                      "Mini Bar",
                      "Laundry Service",
                      "TV",
                      "Spa",
                      "Parking",
                    ].map((amenity, index) => (
                      <div key={index} className="flex items-center ">
                        <input
                          type="checkbox"
                          name="amenities"
                          id={`amenity-${index}`}
                          className="mr-2"
                          value={amenity}
                          onChange={handleAmenitiesChange}
                        />
                        <label htmlFor={`amenity-${index}`} className="text-sm">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-primary-300 rounded-lg 
                focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Add Room
              </button>
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default AddRoom;
