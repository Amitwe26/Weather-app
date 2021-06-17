import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api';



export function Map({ activeCity }) {
  const libraries = ["places"]
  const mapContainerStyle = {
    width: "130px",
    height: "130px",
    marginInlineEnd: "25px",
    borderRadius: "4px"
  }
  const center = {
    lat: activeCity.geolocation.Latitude,
    lng: activeCity.geolocation.Longitude
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries
  })
  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading map"

  return (
    <GoogleMap
      classNmae="map"
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center} >
    </GoogleMap>

  );
}
