import AirportCard from "../AirportCard/AirportCard";

const airports = [
  {
    name: "Dubai International Airport",
    code: "DXB",
    location: "Dubai, United Arab Emirates",
    passengers: "86 million",
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800",
  },
  {
    name: "London Heathrow Airport",
    code: "LHR",
    location: "London, United Kingdom",
    passengers: "74 million",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
  },
  {
    name: "Singapore Changi Airport",
    code: "SIN",
    location: "Singapore",
    passengers: "68 million",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800",
  },
];

export default function AirportSection() {
  return (
    <section className="bg-[#07111F] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-base text-sky-400 sm:text-lg">
            Global Airports
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Explore Airports
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            Discover major aviation hubs around the world.
          </p>
        </div>

        {/* Airport cards */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {airports.map((airport) => (
            <AirportCard
              key={airport.code}
              name={airport.name}
              code={airport.code}
              location={airport.location}
              passengers={airport.passengers}
              image={airport.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
}