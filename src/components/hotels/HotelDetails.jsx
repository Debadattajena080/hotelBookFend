import React, { useEffect, useState, useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import MyMapComponent from "../GoogleMap/GoogleMap";
import RoomDetails from "../Rooms/RoomDetails";
import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import axios from "axios";
import RoomContext from "../../context/RoomDetailsContext";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState();

  const { allRoom } = useContext(RoomContext);

  console.log("All room", allRoom);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/hotels/${id}`
        );
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/hotels/${id}/rooms`)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
      });
  }, [id]);

  console.log("Rooms ", rooms);

  const addRoom = () => {
    navigate(`/hotel/${id}/add-rooms`);
  };

  return (
    <div className="mx-36 mt-4">
      <div>
        <div className="relative">
          <Carousel
            showArrows={true}
            showIndicators={true}
            showThumbs={true}
            centerMode={true}
            centerSlidePercentage={40}
          >
            {hotel?.images?.map((image, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-full"
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                  alt={`HotelImage ${index + 1}`}
                  className="object-cover w-full h-full "
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-semibold mb-2 mt-6">{hotel?.hotelname}</h1>
        <p className="text-gray-500 text-2xl">{hotel?.address}</p>
      </div>

      {/* About this Hotel */}

      <div className="p-6 bg-white shadow-lg rounded-lg mt-4">
        <h2 className="text-2xl font-bold mb-2 mt-6 pb-4 border-b-2">
          About {hotel?.hotelname}
        </h2>
        <p className="text-md my-4 font-semibold">{hotel?.description}</p>
      </div>

      {/* choose your room */}

      <div className="p-6 bg-white shadow-lg rounded-lg mt-4">
        <h2 className="text-2xl font-bold mb-2 mt-4 border-b-2 pb-4 ">
          Choose your room
        </h2>
        <RoomDetails rooms={rooms} />
        <button onClick={() => addRoom()}>Add Room</button>
      </div>

      {/* Hotel Policies  */}

      <div className="p-6 bg-white shadow-lg rounded-lg  mt-6  ">
        <div className="flex items-center pb-4 border-b-2 space-x-16 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Hotel Policies</h2>
          <div className="flex items-center text-gray-700 text-lg bg-blue-50 px-6 py-1 border rounded-full">
            <span>
              Check-In Time: <span className="font-bold"> 12.00 PM</span>
            </span>
            <span className="mx-4 text-gray-400">|</span>
            <span>
              Check-Out Time: <span className="font-bold">11.00 AM</span>
            </span>
          </div>
        </div>

        {/* <!-- Check-in and Check-out times --> */}

        {/* <!-- Policies List --> */}
        <div>
          <ul className="space-y-3 text-md">
            <li className="flex items-center">
              <IoIosCheckmarkCircle className="text-md text-gray-600 rounded-full mt-1 mr-2 " />
              <p className="text-md font-semibold text-gray-700">
                {" "}
                Outside food is not allowed.
              </p>
            </li>
            <li className="flex items-center">
              <IoIosCheckmarkCircle className="text-sm text-gray-600 rounded-full mt-1 mr-2 " />
              <p className="text-md font-semibold text-gray-700">
                Couples are welcome.
              </p>
            </li>
            <li className="flex items-center">
              <IoIosCheckmarkCircle className="text-sm text-gray-600 rounded-full mt-1 mr-2 " />
              <p className="text-md font-semibold text-gray-700">
                Guests can check in using any local or outstation ID proof (PAN
                card not accepted).
              </p>
            </li>
            <li className="flex items-center">
              <IoIosCheckmarkCircle className="text-sm text-gray-600 rounded-full mt-1 mr-2 " />
              <p className="text-md font-semibold text-gray-700">
                Only Indian Nationals allowed.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <MyMapComponent address={hotel?.address} />
      </div>
    </div>
  );
};

export default HotelDetails;
