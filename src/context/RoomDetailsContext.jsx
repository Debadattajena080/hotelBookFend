import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [roomData, setRoomData] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/hotels/${id}/rooms`)
      .then((response) => {
        setRoomData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
      });
  }, []);

  return (
    <RoomContext.Provider value={{ roomData }}>{children}</RoomContext.Provider>
  );
};

export default RoomContext;
