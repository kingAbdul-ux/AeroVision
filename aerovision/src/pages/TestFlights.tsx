import { useEffect, useState } from "react";
import { getLiveFlights } from "../api/aviationApi";

type FlightData = {
  flight?: {
    iata?: string | null;
    icao?: string | null;
  };
  airline?: {
    name?: string | null;
  };
  departure?: {
    airport?: string | null;
    iata?: string | null;
  };
  arrival?: {
    airport?: string | null;
    iata?: string | null;
  };
  flight_status?: string | null;
};

export default function TestAviation() {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFlights() {
      try {
        const data = await getLiveFlights();

        setFlights(data.data ?? []);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load AviationStack data."
        );
      } finally {
        setLoading(false);
      }
    }

    loadFlights();
  }, []);

  return (
    <main className="min-h-screen bg-[#07111F] px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white">
          AviationStack Test
        </h1>

        <p className="text-gray-400 mt-3">
          Testing the AviationStack API connection.
        </p>

        {loading && (
          <p className="text-sky-400 mt-8">
            Loading flight data...
          </p>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-5 mt-8">
            {flights.slice(0, 10).map((item, index) => (
              <div
                key={`${item.flight?.icao ?? "flight"}-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h2 className="text-xl font-bold text-white">
                  {item.flight?.iata ||
                    item.flight?.icao ||
                    "Unknown flight"}
                </h2>

                <p className="text-sky-400 mt-1">
                  {item.airline?.name || "Unknown airline"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 text-gray-300">
                  <p>
                    From:{" "}
                    <span className="text-white">
                      {item.departure?.iata ||
                        item.departure?.airport ||
                        "Unknown"}
                    </span>
                  </p>

                  <p>
                    To:{" "}
                    <span className="text-white">
                      {item.arrival?.iata ||
                        item.arrival?.airport ||
                        "Unknown"}
                    </span>
                  </p>

                  <p>
                    Status:{" "}
                    <span className="text-white">
                      {item.flight_status || "Unknown"}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}