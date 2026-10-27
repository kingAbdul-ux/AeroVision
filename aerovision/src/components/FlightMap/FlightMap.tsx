import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import { fetchAircraft } from "../../services/flightservice";

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

const planeIcon = L.icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/61/61212.png",
  iconSize: [35, 35],
  iconAnchor: [17, 17],
  popupAnchor: [0, -15],
});

export default function FlightMap() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAircraft() {
      try {
        setError("");

        const data = await fetchAircraft();

        const validAircraft: Aircraft[] = data
          .filter(
            (plane: Aircraft) =>
              Number.isFinite(plane.latitude) &&
              Number.isFinite(plane.longitude)
          )
          .slice(0, 50);

        if (!cancelled) {
          setAircraft(validAircraft);
        }
      } catch (err) {
        console.error(
          "Home Flight Map OpenSky error:",
          err
        );

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load live aircraft."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadAircraft();

    const intervalId = window.setInterval(() => {
      void loadAircraft();
    }, 30000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="bg-[#08121b] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mb-8 sm:mb-10">

          <p className="eyebrow">
            Radar feed / refreshed every 30 seconds
          </p>

          <h2 className="display-heading mt-3 text-4xl font-bold text-white sm:text-5xl">
            Global Flight Map
          </h2>

          <p className="mt-3 max-w-xl text-sm text-[#a7bbc2] sm:text-base">
            Real-time positions from the global airspace network.
          </p>

          {loading && (
            <p className="mt-3 text-sm text-sky-400">
              Loading live aircraft...
            </p>
          )}

          {!loading && !error && (
            <p className="mono-data mt-3 text-xs text-[#5ee6a8]">
              {aircraft.length} aircraft currently displayed
            </p>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          )}

        </div>

        {/* Map */}

        <div className="h-112.5 overflow-hidden border border-[#9ab7c3]/25 shadow-2xl sm:h-137.5 lg:h-150">

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

            {aircraft.map((plane) => (
              <Marker
                key={plane.icao24}
                position={[
                  plane.latitude,
                  plane.longitude,
                ]}
                icon={planeIcon}
              >
                <Popup>
                  <div className="min-w-47.5 sm:min-w-55">

                    <h3 className="text-base font-bold sm:text-lg">
                      {plane.callsign ||
                        "Unknown Aircraft"}
                    </h3>

                    <div className="mt-2 space-y-1 text-sm">

                      <p>
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

                    </div>

                  </div>
                </Popup>
              </Marker>
            ))}

          </MapContainer>

        </div>

      </div>
    </section>
  );
}