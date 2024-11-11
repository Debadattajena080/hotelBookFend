import React from "react";

const AddRoom = () => {
  return (
    <>
      <div className="w-full">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          method="POST"
          encType="multipart/form-data"
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
                    id="roomType"
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Deluxe">Classic</option>
                    <option value="Classic">Deluxe</option>
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
                    type="text"
                    name="totalrooms"
                    id="totalrooms"
                    className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Total number of rooms"
                    required=""
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
                    className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Rs 2999"
                    required=""
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
                    className=" border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter capacity per room"
                    required
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
                  />
                </div>

                {/* Amenities Section */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      "Free Wi-Fi",
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
                          value={amenity}
                          className="mr-2"
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
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-primary-300 rounded-lg focus:ring-4 
                focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
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
