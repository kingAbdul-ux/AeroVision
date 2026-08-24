import { useState } from "react";
import { TileLayer } from "react-leaflet";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function WeatherLayers() {
  const [precipitation, setPrecipitation] = useState(false);
  const [clouds, setClouds] = useState(false);

  if (!API_KEY) {
    return null;
  }

  return (
    <>
      {/* Weather controls */}
      <div className="absolute right-4 top-4 z-1000 w-64 rounded-2xl border border-white/10 bg-[#050B16]/95 p-5 text-white shadow-2xl backdrop-blur-xl">

        <h2 className="text-lg font-bold">
          Weather Layers
        </h2>

        <label className="mt-4 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={precipitation}
            onChange={(event) =>
              setPrecipitation(event.target.checked)
            }
            className="h-4 w-4"
          />

          <span className="text-sm">
            Precipitation
          </span>
        </label>

        <label className="mt-3 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={clouds}
            onChange={(event) =>
              setClouds(event.target.checked)
            }
            className="h-4 w-4"
          />

          <span className="text-sm">
            Clouds
          </span>
        </label>

      </div>

      {/* Precipitation layer */}
      {precipitation && (
        <TileLayer
          url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          opacity={0.6}
          attribution="© OpenWeather"
        />
      )}

      {/* Cloud layer */}
      {clouds && (
        <TileLayer
          url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          opacity={0.6}
          attribution="© OpenWeather"
        />
      )}
    </>
  );
}