import { useEffect, useState } from "react";

import AirportCard from "../AirportCard/AirportCard";
import { getAirportByIata } from "../../api/airportApi";

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

const airportCodes = [
  "DXB",
  "LHR",
  "SIN",
];

const airportImages: Record<string, string> = {
  DXB:
    "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800",

  LHR:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",

  SIN:
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800",
};

export default function AirportSection() {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAirports() {
      try {
        setLoading(true);
        setError("");

        const results: Airport[] = [];

        for (const code of airportCodes) {
          const airport = await getAirportByIata(code);

          results.push(airport);

          // Keep requests below the documented rate limit.
          await new Promise((resolve) =>
            setTimeout(resolve, 1200)
          );
        }

        if (!cancelled) {
          setAirports(results);
        }
      } catch (err) {
        console.error(
          "Home airport API error:",
          err
        );

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load airport data."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadAirports();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-[#07111F] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

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


        {/* Loading */}

        {loading && (
          <div className="rounded-2xl border border-sky-400/10 bg-sky-500/5 p-5 text-center">
            <p className="text-sm text-sky-400">
              Loading airport data...
            </p>
          </div>
        )}


        {/* Error */}

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}


        {/* Airport cards */}

        {!loading &&
          !error &&
          airports.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">

              {airports.map((airport) => (
                <AirportCard
                  key={
                    airport.iata ||
                    airport.icao ||
                    airport.name
                  }
                  name={
                    airport.name ||
                    airport.shortName ||
                    "Unknown Airport"
                  }
                  code={
                    airport.iata ||
                    airport.icao ||
                    "N/A"
                  }
                  location={`${airport.municipalityName || "Unknown location"}${
                    airport.countryCode
                      ? `, ${airport.countryCode}`
                      : ""
                  }`}
                  coordinates={
                    airport.location?.lat != null &&
                    airport.location?.lon != null
                      ? `${airport.location.lat.toFixed(
                          4
                        )}, ${airport.location.lon.toFixed(
                          4
                        )}`
                      : "Unavailable"
                  }
                  icao={airport.icao || "N/A"}
                  timeZone={airport.timeZone || "N/A"}
                  runways={
                    Array.isArray(airport.runways)
                      ? airport.runways.length
                      : 0
                  }
                  image={
                    airportImages[
                      airport.iata || ""
                    ] ||
                    airportImages.DXB
                  }
                />
              ))}

            </div>
          )}

      </div>
    </section>
  );
}