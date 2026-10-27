import AirportCard from "../AirportCard/AirportCard";

const airports = [
  {
    name: "Dubai International",
    code: "DXB",
    icao: "OMDB",
    location: "Dubai, United Arab Emirates",
    coordinates: { lat: 25.2528, lon: 55.3644 },
    timeZone: "GST",
    runways: 3,
    passengers: "86 million",
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800",
  },

  {
    name: "London Heathrow",
    code: "LHR",
    icao: "EGLL",
    location: "London, United Kingdom",
    coordinates: { lat: 51.4700, lon: -0.4543 },
    timeZone: "GMT",
    runways: 3,
    passengers: "74 million",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
  },

  {
    name: "Singapore Changi",
    code: "SIN",
    icao: "WSSS",
    location: "Singapore",
    coordinates: { lat: 1.3521, lon: 103.8198 },
    timeZone: "SGT",
    runways: 4,
    passengers: "68 million",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800",
  },
];


export default function AirportSection() {
  return (
    <section className="bg-[#07111F] py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">

          <p className="text-sky-400 text-lg">
            Global Airports
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            Explore Airports
          </h2>

          <p className="text-gray-400 mt-4">
            Discover major aviation hubs around the world.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {airports.map((airport) => (
            <AirportCard
              key={airport.code}
              name={airport.name}
              code={airport.code}
              location={airport.location}
              image={airport.image}
              coordinates={`${airport.coordinates.lat}, ${airport.coordinates.lon}`}
              icao={airport.icao}
              timeZone={airport.timeZone}
              runways={airport.runways}
            />
          ))}

        </div>

      </div>

    </section>
  );
}