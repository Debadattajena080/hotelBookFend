import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MyMapComponent = ({ address }) => {
  const [coordinates, setCoordinates] = useState(null); // To store lat/lng
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        setCoordinates({
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        });
      } else {
        console.error("No results found for the specified address.");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  useEffect(() => {
    if (address) {
      geocodeAddress(address);
    }
  }, [address]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={16}
        center={coordinates || { lat: 37.783333, lng: -122.416667 }}
      >
        {coordinates && <Marker position={coordinates} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMapComponent;
