import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";


// Aircraft icon
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
    position: [25.2532, 55.3657],
  },

  {
    id: "BA117",
    airline: "British Airways",
    aircraft: "Boeing 787",
    route: "London → New York",
    position: [51.4700, -0.4543],
  },

  {
    id: "SQ12",
    airline: "Singapore Airlines",
    aircraft: "Airbus A350",
    route: "Singapore → Tokyo",
    position: [1.3644, 103.9915],
  },

];


export default function FlightMap() {

  return (

    <section className="bg-[#07111F] py-20">

      <div className="max-w-7xl mx-auto px-6">


        <div className="mb-10">

          <p className="text-sky-400">
            Live Tracking
          </p>


          <h2 className="text-4xl font-bold text-white mt-3">
            Global Flight Map
          </h2>


          <p className="text-gray-400 mt-3">
            Track aircraft around the world.
          </p>

        </div>



        <div className="h-150 rounded-3xl overflow-hidden border border-white/10">


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

                position={
                  flight.position as [number, number]
                }

                icon={planeIcon}

              >

                <Popup>

                  <div>

                    <h3 className="font-bold">
                      {flight.id}
                    </h3>


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

                </Popup>


              </Marker>

            ))}


          </MapContainer>


        </div>


      </div>

    </section>

  );
}