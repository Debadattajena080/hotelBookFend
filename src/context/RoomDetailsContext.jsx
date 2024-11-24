import axios from "axios";
import { useState, createContext } from "react";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [roomData, setRoomData] = useState();

  const fetchRoomDetailsById = (id) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/hotels/${id}/rooms`)
      .then((response) => {
        setRoomData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
      });
  };

  return (
    <RoomContext.Provider value={{ roomData, fetchRoomDetailsById }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContext;
