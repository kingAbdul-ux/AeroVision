import { useEffect, useState } from "react";
import { MapPin, Search, Plane } from "lucide-react";

import {
  getAirportByIata,
  searchAirports,
} from "../api/airportApi";

type Airport = {
  icao?: string;
  iata?: string;
  name?: string;
  shortName?: string;
  municipalityName?: string;
  countryCode?: string;

  location?: {
    lat?: number;
    lon?: number;
  };

  timeZone?: string;

  runways?: unknown[];
};

const defaultAirports = [
  "DXB",
  "LHR",
  "SIN",
  "HND",
  "JFK",
];

export default function Airports() {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDefaultAirports() {
    try {
      setLoading(true);
      setError("");

      const results: Airport[] = [];

      // Load one airport at a time to respect the API rate limit.
      for (const code of defaultAirports) {
        const airport = await getAirportByIata(code);

        results.push(airport);

        await new Promise((resolve) =>
          setTimeout(resolve, 1200)
        );
      }

      setAirports(results);
    } catch (err: unknown) {
      console.error("Airport API error:", err);

      const response =
        typeof err === "object" &&
        err !== null &&
        "response" in err
          ? err.response
          : undefined;

      const status =
        typeof response === "object" &&
        response !== null &&
        "status" in response
          ? response.status
          : undefined;

      if (status === 429) {
        setError(
          "Airport API rate limit reached. Please wait a little and try again."
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load airport data."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadDefaultAirports();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  async function handleSearch() {
    const value = search.trim();

    if (!value) {
      await loadDefaultAirports();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await searchAirports(value);

      setAirports(result.items || []);
    } catch (err: unknown) {
      console.error("Airport search error:", err);

      const response =
        typeof err === "object" &&
        err !== null &&
        "response" in err
          ? err.response
          : undefined;

      const status =
        typeof response === "object" &&
        response !== null &&
        "status" in response
          ? response.status
          : undefined;

      if (status === 429) {
        setError(
          "Airport API rate limit reached. Please wait and try again."
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to search airports."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111F] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <p className="text-base text-sky-400 sm:text-lg">
          AeroVision
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
          Airport Explorer
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-gray-400 sm:text-base">
          Explore real airport information around the world.
        </p>


        {/* Search */}

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 md:flex-row">

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  void handleSearch();
                }
              }}
              placeholder="Search airport, city or code..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-sky-400 sm:py-4 sm:pl-12 sm:pr-5 sm:text-base"
            />

          </div>

          <button
            type="button"
            onClick={() => void handleSearch()}
            className="rounded-2xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-400 sm:px-7 sm:py-4 sm:text-base"
          >
            Search
          </button>

        </div>


        {/* Loading */}

        {loading && (
          <div className="mt-8 rounded-2xl border border-sky-400/10 bg-sky-500/5 p-5">
            <p className="text-sm text-sky-400">
              Loading airport data...
            </p>
          </div>
        )}


        {/* Error */}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
            <p className="text-sm font-medium text-red-300">
              Airport Explorer
            </p>

            <p className="mt-1 text-sm text-red-400">
              {error}
            </p>
          </div>
        )}


        {/* Empty */}

        {!loading &&
          !error &&
          airports.length === 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-gray-400">
                No airports found.
              </p>
            </div>
          )}


        {/* Airport cards */}

        {!loading &&
          !error &&
          airports.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">

              {airports.map((airport, index) => {
                const airportCode =
                  airport.iata ||
                  airport.icao ||
                  "N/A";

                const airportName =
                  airport.name ||
                  airport.shortName ||
                  "Unknown Airport";

                const locationText =
                  airport.municipalityName ||
                  "Unknown location";

                return (
                  <div
                    key={`${airportCode}-${index}`}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:bg-white/10 sm:p-6"
                  >

                    {/* Card heading */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <p className="text-2xl font-bold text-sky-400 sm:text-3xl">
                          {airportCode}
                        </p>

                        <h2 className="mt-3 wrap-break-word text-lg font-bold text-white sm:text-xl">
                          {airportName}
                        </h2>

                      </div>

                      <div className="shrink-0 rounded-xl bg-sky-500/10 p-3">
                        <Plane
                          size={21}
                          className="text-sky-400"
                        />
                      </div>

                    </div>


                    {/* Location */}

                    <p className="mt-4 wrap-break-word text-sm text-gray-400 sm:text-base">
                      {locationText}

                      {airport.countryCode
                        ? `, ${airport.countryCode}`
                        : ""}
                    </p>


                    {/* Details */}

                    <div className="mt-6 space-y-3 border-t border-white/10 pt-5">

                      <div className="flex items-start gap-2 text-sm text-gray-400">

                        <MapPin
                          size={17}
                          className="mt-0.5 shrink-0"
                        />

                        <span className="wrap-break-word">

                          {airport.location?.lat != null &&
                          airport.location?.lon != null
                            ? `${airport.location.lat.toFixed(
                                4
                              )}, ${airport.location.lon.toFixed(
                                4
                              )}`
                            : "Coordinates unavailable"}

                        </span>

                      </div>


                      <div className="text-sm text-gray-400">

                        ICAO:{" "}

                        <span className="wrap-break-word text-white">
                          {airport.icao || "N/A"}
                        </span>

                      </div>


                      <div className="text-sm text-gray-400">

                        Time zone:{" "}

                        <span className="wrap-break-word text-white">
                          {airport.timeZone || "N/A"}
                        </span>

                      </div>


                      <div className="text-sm text-gray-400">

                        Runways:{" "}

                        <span className="text-white">
                          {Array.isArray(
                            airport.runways
                          )
                            ? airport.runways.length
                            : "N/A"}
                        </span>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

      </div>
    </main>
  );
}