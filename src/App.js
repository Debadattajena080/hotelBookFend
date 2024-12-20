import { Routes, Route, BrowserRouter } from "react-router-dom";

import AddHotel from "./components/hotels/AddHotel";
import HotelHomePage from "./components/hotels/Index";
import HotelDetails from "./components/hotels/HotelDetails";
import RoomDetails from "./components/Rooms/RoomDetails";
import BookingForm from "./components/Bookings/BookingForm";
import Navbar from "./components/Navbar/Navbar";
import SearchResults from "./components/Search/SearchResults";

import AddRoom from "./components/Rooms/AddRoom";
import BookingIndex from "./components/Bookings/BookingIndex";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import ProtectedRoute from "./utility/ProtectedRoute";
import Myproperties from "./components/hotels/Myproperties";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { userRole } = useContext(AuthContext);

  return (
    <div className="App bg-gray-100 min-h-[100vh] ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              userRole === "admin" ? <Myproperties /> : <HotelHomePage />
            }
          />
          <Route
            path="/user/:userId/add-hotel"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddHotel />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/:userId/myproperties"
            element={
              <ProtectedRoute requiredRole="admin">
                <Myproperties />
              </ProtectedRoute>
            }
          />

          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route
            path="/hotel/:id/add-rooms"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddRoom />
              </ProtectedRoute>
            }
          />
          <Route path="/hotel/:id/rooms" element={<RoomDetails />} />
          <Route
            path="/hotel/:id/room/:roomId/book-room"
            element={<BookingForm />}
          />
          <Route path="/search_results" element={<SearchResults />} />

          <Route
            path="/all-bookings"
            element={
              <ProtectedRoute requiredRole="admin">
                <BookingIndex />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
