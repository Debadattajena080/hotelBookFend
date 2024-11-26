import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HotelCard from "../hotels/HotelCard";
import { toast } from "react-toastify";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      const destination = searchParams.get("destination");
      const checkIn = searchParams.get("checkIn");
      const checkOut = searchParams.get("checkOut");
      const rooms = searchParams.get("rooms");
      const guests = searchParams.get("guests");

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/search_hotels`,
          {
            params: {
              destination,
              checkIn,
              checkOut,
              rooms,
              guests,
            },
          }
        );
        setHotels(response.data);
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDetails = (id) => {
    const currentQueryParams = searchParams.toString();
    const newUrl = `/hotel/${id}?${currentQueryParams}`;
    navigate(newUrl);
  };

  return (
    <div className="search-results">
      {hotels.length > 0 ? (
        <div>
          <div className=" gap-4 justify-center flex flex-row flex-wrap items-center mx-36 mt-4 ">
            {hotels.map((hotel, id) => (
              <div
                key={id}
                className="border shadow-lg rounded-lg p-6 flex gap-6 mb-6 w-full bg-white"
              >
                <HotelCard hotel={hotel} handleDetails={handleDetails} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No hotels found based on your search criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;
