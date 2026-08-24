import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import { useEffect, useState } from "react";

import planeIcon from "../assets/plane-icon.png";
import { fetchAircraft } from "../services/flightservice";
import MapControl from "../components/MapControl/MapControl";

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

const aircraftIcon = L.icon({
  iconUrl: planeIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

const OPENWEATHER_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY;

function FocusAircraft({
  aircraft,
}: {
  aircraft: Aircraft | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!aircraft) {
      return;
    }

    map.flyTo(
      [aircraft.latitude, aircraft.longitude],
      6,
      {
        duration: 1.5,
      }
    );
  }, [aircraft, map]);

  return null;
}

function WeatherLayers() {
  const [showPrecipitation, setShowPrecipitation] =
    useState(false);

  const [showClouds, setShowClouds] =
    useState(false);

  const [weatherRefreshKey, setWeatherRefreshKey] =
    useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setWeatherRefreshKey((value) => value + 1);
    }, 5 * 60 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  if (!OPENWEATHER_KEY) {
    return null;
  }

  return (
    <>
      <div className="absolute right-4 top-4 z-1000 w-64 rounded-2xl border border-white/10 bg-[#050B16]/95 p-5 text-white shadow-2xl backdrop-blur-xl">
        <h2 className="text-lg font-bold">
          Weather Layers
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Updates every 5 minutes
        </p>

        <label className="mt-4 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={showPrecipitation}
            onChange={(event) =>
              setShowPrecipitation(
                event.target.checked
              )
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
            checked={showClouds}
            onChange={(event) =>
              setShowClouds(
                event.target.checked
              )
            }
            className="h-4 w-4"
          />

          <span className="text-sm">
            Clouds
          </span>
        </label>
      </div>

      {showPrecipitation && (
        <TileLayer
          key={`precipitation-${weatherRefreshKey}`}
          url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_KEY}`}
          opacity={0.6}
          attribution="© OpenWeather"
        />
      )}

      {showClouds && (
        <TileLayer
          key={`clouds-${weatherRefreshKey}`}
          url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_KEY}`}
          opacity={0.6}
          attribution="© OpenWeather"
        />
      )}
    </>
  );
}

export default function LiveMap() {
  const [aircraft, setAircraft] =
    useState<Aircraft[]>([]);

  const [selectedAircraft, setSelectedAircraft] =
    useState<Aircraft | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadAircraft = async () => {
      try {
        setError("");

        const data = await fetchAircraft();

        const validAircraft: Aircraft[] =
          data.filter(
            (plane: Aircraft) =>
              Number.isFinite(plane.latitude) &&
              Number.isFinite(plane.longitude)
          );

        const limitedAircraft =
          validAircraft.slice(0, 100);

        setAircraft(limitedAircraft);

        setSelectedAircraft((current) => {
          if (!current) {
            return null;
          }

          return (
            limitedAircraft.find(
              (plane) =>
                plane.icao24 === current.icao24
            ) || null
          );
        });
      } catch (err) {
        console.error("OpenSky error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load live aircraft data."
        );
      } finally {
        setLoading(false);
      }
    };

    void loadAircraft();

    const intervalId = window.setInterval(() => {
      void loadAircraft();
    }, 30000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#07111F]">

      <div className="px-6 py-8">
        <div className="mx-auto max-w-7xl">

          <p className="text-lg text-sky-400">
            AeroVision
          </p>

          <h1 className="mt-2 text-5xl font-bold text-white">
            Live Flight Map
          </h1>

          <p className="mt-3 text-gray-400">
            Real aircraft positions powered by OpenSky Network.
          </p>

          {loading && (
            <p className="mt-4 text-sky-400">
              Loading aircraft...
            </p>
          )}

          {!loading && !error && (
            <p className="mt-4 text-green-400">
              {aircraft.length} aircraft detected
            </p>
          )}

          {error && (
            <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
              <p className="text-red-400">
                {error}
              </p>
            </div>
          )}

        </div>
      </div>

      <div className="relative h-175 w-full">

        <MapControl
          aircraft={aircraft}
          selectedAircraft={selectedAircraft}
          onSelect={setSelectedAircraft}
        />

        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={true}
          className="h-full w-full"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <WeatherLayers />

          <FocusAircraft
            aircraft={selectedAircraft}
          />

          {aircraft.map((plane) => (
            <Marker
              key={plane.icao24}
              position={[
                plane.latitude,
                plane.longitude,
              ]}
              icon={aircraftIcon}
              eventHandlers={{
                click: () => {
                  setSelectedAircraft(plane);
                },
              }}
            >
              <Popup>

                <div className="min-w-55">

                  <h2 className="text-lg font-bold">
                    {plane.callsign ||
                      "Unknown Aircraft"}
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
                      ? `${Math.round(
                          plane.altitude
                        )} m`
                      : "N/A"}
                  </p>

                  <p>
                    Speed:{" "}
                    {plane.velocity !== null
                      ? `${Math.round(
                          plane.velocity * 3.6
                        )} km/h`
                      : "N/A"}
                  </p>

                  <p>
                    Heading:{" "}
                    {plane.heading !== null
                      ? `${Math.round(
                          plane.heading
                        )}°`
                      : "N/A"}
                  </p>

                  <p>
                    Position:{" "}
                    {plane.latitude.toFixed(3)},{" "}
                    {plane.longitude.toFixed(3)}
                  </p>

                </div>

              </Popup>
            </Marker>
          ))}

        </MapContainer>

      </div>

    </main>
  );
}