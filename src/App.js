import { Routes, Route, BrowserRouter } from "react-router-dom";

import AddHotel from "./components/hotels/AddHotel";
import HotelHomePage from "./components/hotels/Index";
import HotelDetails from "./components/hotels/HotelDetails";
import RoomDetails from "./components/Rooms/RoomDetails";
import BookingForm from "./components/Bookings/BookingForm";

import AddRoom from "./components/Rooms/AddRoom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HotelHomePage />} />
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/hotel/:id/add-rooms" element={<AddRoom />} />
          <Route path="/hotel/:id/rooms" element={<RoomDetails />} />
          <Route
            path="/hotel/:id/room/:roomId/book-room"
            element={<BookingForm />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
