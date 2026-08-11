import { Cloud, Sun, Wind, Eye } from "lucide-react";

const airports = [
  {
    code: "DXB",
    airport: "Dubai International",
    weather: "Clear",
    temperature: "37°C",
    wind: "12 km/h",
    visibility: "10 km",
    pressure: "1013 hPa",
    flightRule: "VFR",
  },
  {
    code: "LHR",
    airport: "London Heathrow",
    weather: "Cloudy",
    temperature: "18°C",
    wind: "20 km/h",
    visibility: "8 km",
    pressure: "1008 hPa",
    flightRule: "MVFR",
  },
  {
    code: "JFK",
    airport: "John F. Kennedy",
    weather: "Rain",
    temperature: "22°C",
    wind: "30 km/h",
    visibility: "4 km",
    pressure: "1004 hPa",
    flightRule: "IFR",
  },
];

export default function Weather() {
  return (
    <div className="min-h-screen bg-[#07111F] px-6 py-20">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-white">
          Aviation Weather
        </h1>

        <p className="text-gray-400 mt-3">
          Live airport weather conditions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

          {airports.map((airport) => (

            <div
              key={airport.code}
              className="rounded-3xl bg-white/5 border border-white/10 p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-3xl font-bold text-sky-400">
                    {airport.code}
                  </h2>

                  <p className="text-gray-400">
                    {airport.airport}
                  </p>

                </div>

                <Sun className="text-yellow-400" />

              </div>

              <div className="mt-6 space-y-4 text-white">

                <p>
                  <Cloud className="inline mr-2" size={18} />
                  {airport.weather}
                </p>

                <p>
                  🌡 {airport.temperature}
                </p>

                <p>
                  <Wind className="inline mr-2" size={18} />
                  {airport.wind}
                </p>

                <p>
                  <Eye className="inline mr-2" size={18} />
                  {airport.visibility}
                </p>

                <p>
                  Pressure: {airport.pressure}
                </p>

                <div className="mt-4 rounded-xl bg-sky-500/20 text-sky-300 text-center py-2">
                  {airport.flightRule}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}