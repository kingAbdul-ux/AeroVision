import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLiveFlights } from "../api/aviationApi";

type Flight = {
  flight?: {
    iata?: string | null;
    icao?: string | null;
  };

  airline?: {
    name?: string | null;
    iata?: string | null;
    icao?: string | null;
  };

  departure?: {
    airport?: string | null;
    iata?: string | null;
    scheduled?: string | null;
    estimated?: string | null;
    actual?: string | null;
    terminal?: string | null;
    gate?: string | null;
  };

  arrival?: {
    airport?: string | null;
    iata?: string | null;
    scheduled?: string | null;
    estimated?: string | null;
    actual?: string | null;
    terminal?: string | null;
    gate?: string | null;
  };

  flight_status?: string | null;

  aircraft?: {
    registration?: string | null;
    iata?: string | null;
    icao?: string | null;
  };

  live?: {
    latitude?: number | null;
    longitude?: number | null;
    altitude?: number | null;
    direction?: number | null;
    speed_horizontal?: number | null;
  };
};

export default function Flights() {
  const navigate = useNavigate();

  const [flights, setFlights] = useState<Flight[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFlights() {
      try {
        setLoading(true);
        setError("");

        const response = await getLiveFlights();

        setFlights(response.data ?? []);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load live flight data."
        );
      } finally {
        setLoading(false);
      }
    }

    loadFlights();
  }, []);

  const filteredFlights = flights.filter((flight) => {
    const flightNumber =
      flight.flight?.iata ||
      flight.flight?.icao ||
      "";

    const airline =
      flight.airline?.name ||
      "";

    return (
      flightNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      airline
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  function openFlight(flight: Flight) {
    const flightNumber =
      flight.flight?.iata ||
      flight.flight?.icao;

    if (!flightNumber) {
      return;
    }

    navigate(
      `/flight/${encodeURIComponent(flightNumber)}`,
      {
        state: {
          flight,
        },
      }
    );
  }

  return (
    <main className="min-h-screen bg-[#07111F] px-6 py-20">
      <div className="max-w-7xl mx-auto">

        <p className="text-sky-400">
          AeroVision
        </p>

        <h1 className="mt-2 text-5xl font-bold text-white">
          Flights
        </h1>

        <p className="mt-3 text-gray-400">
          Live flight information powered by AviationStack.
        </p>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search flight or airline..."
          className="mt-10 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-sky-400"
        />

        {loading && (
          <p className="mt-8 text-sky-400">
            Loading live flights...
          </p>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
            <p className="text-red-400">
              {error}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          filteredFlights.length === 0 && (
            <p className="mt-8 text-gray-400">
              No flights found.
            </p>
          )}

        {!loading &&
          !error &&
          filteredFlights.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

              {filteredFlights.map((flight, index) => {
                const flightNumber =
                  flight.flight?.iata ||
                  flight.flight?.icao ||
                  "Unknown";

                const airline =
                  flight.airline?.name ||
                  "Unknown Airline";

                const from =
                  flight.departure?.iata ||
                  flight.departure?.airport ||
                  "Unknown";

                const to =
                  flight.arrival?.iata ||
                  flight.arrival?.airport ||
                  "Unknown";

                const status =
                  flight.flight_status ||
                  "Unknown";

                return (
                  <button
                    key={`${flightNumber}-${index}`}
                    type="button"
                    onClick={() => openFlight(flight)}
                    className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-sky-400"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {flightNumber}
                        </h2>

                        <p className="mt-1 text-sky-400">
                          {airline}
                        </p>
                      </div>

                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                        {status}
                      </span>

                    </div>

                    <div className="mt-7 flex items-center justify-between">

                      <div>
                        <p className="text-sm text-gray-500">
                          Departure
                        </p>

                        <p className="mt-1 font-semibold text-white">
                          {from}
                        </p>
                      </div>

                      <div className="text-xl text-sky-400">
                        ✈
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Arrival
                        </p>

                        <p className="mt-1 font-semibold text-white">
                          {to}
                        </p>
                      </div>

                    </div>

                    <p className="mt-6 text-sm text-sky-400">
                      View live flight details →
                    </p>

                  </button>
                );
              })}

            </div>
          )}

      </div>
    </main>
  );
}