import { Routes, Route, BrowserRouter } from "react-router-dom";

import AddHotel from "./components/hotels/AddHotel";
import HotelHomePage from "./components/hotels/Index";
import HotelDetails from "./components/hotels/HotelDetails";

import AddRoom from "./components/Rooms/AddRoom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HotelHomePage />} />
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/hotel/:id/add-rooms" element={<AddRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
