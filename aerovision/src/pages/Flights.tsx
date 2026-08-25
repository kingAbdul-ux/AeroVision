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
        console.error("AviationStack error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load live flight data."
        );
      } finally {
        setLoading(false);
      }
    }

    void loadFlights();
  }, []);

  const searchValue = search.toLowerCase().trim();

  const filteredFlights = flights.filter((flight) => {
    const flightNumber =
      flight.flight?.iata ||
      flight.flight?.icao ||
      "";

    const airline =
      flight.airline?.name ||
      "";

    const departure =
      flight.departure?.iata ||
      flight.departure?.airport ||
      "";

    const arrival =
      flight.arrival?.iata ||
      flight.arrival?.airport ||
      "";

    return (
      flightNumber.toLowerCase().includes(searchValue) ||
      airline.toLowerCase().includes(searchValue) ||
      departure.toLowerCase().includes(searchValue) ||
      arrival.toLowerCase().includes(searchValue)
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
    <main className="min-h-screen bg-[#07111F] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <p className="text-base text-sky-400 sm:text-lg">
          AeroVision
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
          Flights
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-gray-400 sm:text-base">
          Live flight information powered by AviationStack.
        </p>


        {/* Search */}

        <div className="mt-8 sm:mt-10">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search flight, airline, airport..."
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-sky-400 sm:px-5 sm:py-4 sm:text-base"
          />

        </div>


        {/* Loading */}

        {loading && (
          <div className="mt-8 rounded-2xl border border-sky-400/10 bg-sky-500/5 p-5">
            <p className="text-sm text-sky-400">
              Loading live flights...
            </p>
          </div>
        )}


        {/* Error */}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
            <p className="text-sm font-medium text-red-300">
              AviationStack
            </p>

            <p className="mt-1 text-sm text-red-400">
              {error}
            </p>
          </div>
        )}


        {/* Empty state */}

        {!loading &&
          !error &&
          filteredFlights.length === 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-gray-400">
                No flights found.
              </p>
            </div>
          )}


        {/* Flight cards */}

        {!loading &&
          !error &&
          filteredFlights.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2">

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
                    className="w-full rounded-3xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/60 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/50 sm:p-6"
                  >

                    {/* Flight header */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                      <div className="min-w-0">

                        <h2 className="truncate text-2xl font-bold text-white sm:text-3xl">
                          {flightNumber}
                        </h2>

                        <p className="mt-1 truncate text-sm text-sky-400 sm:text-base">
                          {airline}
                        </p>

                      </div>


                      <span
                        className={`self-start rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${
                          status.toLowerCase() === "active"
                            ? "bg-green-500/10 text-green-400"
                            : status.toLowerCase() === "landed"
                            ? "bg-sky-500/10 text-sky-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {status}
                      </span>

                    </div>


                    {/* Route */}

                    <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">

                      <div className="min-w-0">

                        <p className="text-xs text-gray-500 sm:text-sm">
                          Departure
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-white sm:text-base">
                          {from}
                        </p>

                      </div>


                      <div className="text-lg text-sky-400 sm:text-xl">
                        ✈
                      </div>


                      <div className="min-w-0 text-right">

                        <p className="text-xs text-gray-500 sm:text-sm">
                          Arrival
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-white sm:text-base">
                          {to}
                        </p>

                      </div>

                    </div>


                    {/* Action */}

                    <div className="mt-6 border-t border-white/10 pt-5">

                      <p className="text-sm font-medium text-sky-400">
                        View live flight details →
                      </p>

                    </div>

                  </button>
                );
              })}

            </div>
          )}

      </div>
    </main>
  );
}