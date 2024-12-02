import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
// import HotelCard from "./HotelCard";
import { toast } from "react-toastify";
import LoadingPage from "../../utility/LoadingPage";
import FallbackPage from "../../utility/FallbackPage";

const LazyHotelCard = lazy(() => import("./HotelCard"));

const HotelHomePage = () => {
  const [hotelList, setHotelList] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchhotel = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/allhotels`
        );
        const hotel = await response.json();
        setHotelList(hotel);
        // setIsLoading(false)
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchhotel();
  }, []);

  console.log(hotelList);
  const handleDetails = (id) => {
    navigate(`/hotel/${id}`);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className=" gap-4 justify-center flex flex-row flex-wrap items-center mx-36 mt-4 ">
        {hotelList.map((hotel, id) => (
          <div
            key={id}
            className="border shadow-lg rounded-lg p-6 flex gap-6 mb-6 w-full bg-white"
          >
            <Suspense fallback={<FallbackPage />}>
              <LazyHotelCard hotel={hotel} handleDetails={handleDetails} />
            </Suspense>
          </div>
        ))}
      </div>
    </>
  );
};

export default HotelHomePage;
