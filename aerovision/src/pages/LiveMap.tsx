import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import { useEffect, useState } from "react";

import planeIcon from "../assets/plane-icon.png";
import { fetchAircraft } from "../services/flightservice";


type Aircraft = {
  icao24: string;
  callsign: string | null;
  country: string;
  latitude: number;
  longitude: number;
  altitude: number | null;
  velocity: number | null;
  heading: number | null;
};


const aircraftIcon = new L.Icon({
  iconUrl: planeIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});


export default function LiveMap() {

  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  async function loadAircraft() {

    try {

      setError(null);

      const data = await fetchAircraft();

      setAircraft(data.slice(0, 100));

    } catch (err) {

      console.error("OpenSky error:", err);

      setError("Unable to load aircraft data.");

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {
    const refreshAircraft = () => {
      void loadAircraft();
    };

    const timeout = setTimeout(refreshAircraft, 0);
    const interval = setInterval(refreshAircraft, 30000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);


  return (

    <div className="min-h-screen bg-[#07111F]">

      <div className="px-6 py-8">

        <h1 className="text-5xl font-bold text-white">
          Live Flight Map
        </h1>

        <p className="text-gray-400 mt-3">
          Live aircraft positions powered by OpenSky Network.
        </p>


        {loading && (
          <p className="text-sky-400 mt-4">
            Loading aircraft...
          </p>
        )}


        {!loading && !error && (
          <p className="text-green-400 mt-4">
            {aircraft.length} aircraft detected
          </p>
        )}


        {error && (
          <p className="text-red-400 mt-4">
            {error}
          </p>
        )}

      </div>


      <div className="h-175">

        <MapContainer
          center={[20, 0]}
          zoom={2}
          className="h-full w-full"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {aircraft.map((plane) => (

            <Marker
              key={plane.icao24}
              position={[
                plane.latitude,
                plane.longitude,
              ]}
              icon={aircraftIcon}
            >

              <Popup>

                <div className="min-w-50">

                  <h2 className="text-lg font-bold">
                    {plane.callsign || "Unknown Flight"}
                  </h2>


                  <p className="mt-2">
                    Country: {plane.country}
                  </p>


                  <p>
                    ICAO24: {plane.icao24}
                  </p>


                  <p>
                    Altitude:{" "}
                    {plane.altitude !== null
                      ? `${Math.round(plane.altitude)} m`
                      : "N/A"}
                  </p>


                  <p>
                    Speed:{" "}
                    {plane.velocity !== null
                      ? `${Math.round(plane.velocity * 3.6)} km/h`
                      : "N/A"}
                  </p>


                  <p>
                    Heading:{" "}
                    {plane.heading !== null
                      ? `${Math.round(plane.heading)}°`
                      : "N/A"}
                  </p>

                </div>

              </Popup>

            </Marker>

          ))}

        </MapContainer>

      </div>

    </div>

  );
}