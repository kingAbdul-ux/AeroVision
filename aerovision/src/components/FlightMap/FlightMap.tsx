import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const planeIcon = L.icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/61/61212.png",

  iconSize: [35, 35],
  iconAnchor: [17, 17],
  popupAnchor: [0, -15],
});

const flights = [
  {
    id: "EK202",
    airline: "Emirates",
    aircraft: "Airbus A380",
    route: "Dubai → New York",
    position: [25.2532, 55.3657] as [number, number],
  },
  {
    id: "BA117",
    airline: "British Airways",
    aircraft: "Boeing 787",
    route: "London → New York",
    position: [51.47, -0.4543] as [number, number],
  },
  {
    id: "SQ12",
    airline: "Singapore Airlines",
    aircraft: "Airbus A350",
    route: "Singapore → Tokyo",
    position: [1.3644, 103.9915] as [number, number],
  },
];

export default function FlightMap() {
  return (
    <section className="bg-[#07111F] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mb-8 sm:mb-10">

          <p className="text-base text-sky-400 sm:text-lg">
            Live Tracking
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Global Flight Map
          </h2>

          <p className="mt-3 max-w-xl text-sm text-gray-400 sm:text-base">
            Track aircraft around the world.
          </p>

        </div>


        {/* Map */}

        <div className="h-112.5 overflow-hidden rounded-3xl border border-white/10 sm:h-137.5 lg:h-150">

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

            {flights.map((flight) => (
              <Marker
                key={flight.id}
                position={flight.position}
                icon={planeIcon}
              >
                <Popup>
                  <div className="min-w-47.5 sm:min-w-55">

                    <h3 className="text-base font-bold sm:text-lg">
                      {flight.id}
                    </h3>

                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        Airline: {flight.airline}
                      </p>

                      <p>
                        Aircraft: {flight.aircraft}
                      </p>

                      <p>
                        Route: {flight.route}
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