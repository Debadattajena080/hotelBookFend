import { Routes, Route, BrowserRouter } from "react-router-dom";

import AddHotel from "./components/hotels/AddHotel";
import HotelHomePage from "./components/hotels/Index";
import HotelDetails from "./components/hotels/HotelDetails";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HotelHomePage />} />
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
