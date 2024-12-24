import React from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const WeatherMap = ({ coordinates, apiKey }) => {
  if (!coordinates || !coordinates.lat || !coordinates.lon) {
    return (
      <p style={{ color: "white" }}>
        Invalid location data. Unable to load map.
      </p>
    );
  }

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100); // Allow time for layout adjustments
  }, []);

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lon]}
      zoom={6}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "8px",
        minHeight: "500px",
      }}
    >
      <LayersControl position="topright">
        {/* Base Map */}
        <LayersControl.BaseLayer checked name="Dark Theme">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          />
        </LayersControl.BaseLayer>

        {/* Clouds Overlay */}
        <LayersControl.Overlay name="Clouds">
          <TileLayer
            url={`http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.Overlay>

        {/* Precipitation Overlay */}
        <LayersControl.Overlay name="Precipitation">
          <TileLayer
            url={`http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.Overlay>

        {/* Wind Overlay */}
        <LayersControl.Overlay name="Wind">
          <TileLayer
            url={`http://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.Overlay>

        {/* Temperature Overlay */}
        <LayersControl.Overlay name="Temperature">
          <TileLayer
            url={`http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default WeatherMap;
