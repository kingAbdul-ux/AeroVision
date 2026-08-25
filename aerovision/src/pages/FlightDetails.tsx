import { useEffect, useState, type ReactNode } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Plane,
  Gauge,
  Navigation,
  MapPin,
  Clock,
} from "lucide-react";

import { getFlightByNumber } from "../api/aviationApi";

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

function formatDateTime(value?: string | null) {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

export default function FlightDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const navigationState = location.state as
    | { flight?: Flight }
    | null;

  const [flight, setFlight] = useState<Flight | null>(
    navigationState?.flight ?? null
  );

  const [loading, setLoading] = useState(
    !navigationState?.flight
  );

  const [error, setError] = useState("");

  useEffect(() => {
    if (flight || !id) {
      return;
    }

    const flightId = id;

    async function loadFlight() {
      try {
        setLoading(true);
        setError("");

        const response = await getFlightByNumber(
          decodeURIComponent(flightId)
        );

        const result = response?.data?.[0];

        if (!result) {
          throw new Error(
            `AviationStack could not find ${id}.`
          );
        }

        setFlight(result);
      } catch (err) {
        console.error("Flight details error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load flight details."
        );
      } finally {
        setLoading(false);
      }
    }

    void loadFlight();
  }, [id, flight]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07111F] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-base text-sky-400 sm:text-lg">
            AeroVision
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            Flight Details
          </h1>

          <p className="mt-5 text-sm text-gray-400 sm:text-base">
            Loading live flight information...
          </p>
        </div>
      </main>
    );
  }

  if (error || !flight) {
    return (
      <main className="min-h-screen bg-[#07111F] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-base text-sky-400 sm:text-lg">
            AeroVision
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            Flight Details
          </h1>

          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 sm:p-6">
            <p className="text-sm text-red-400 sm:text-base">
              {error || "Flight not found."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const flightNumber =
    flight.flight?.iata ||
    flight.flight?.icao ||
    id ||
    "Unknown";

  const airline =
    flight.airline?.name ||
    "Unknown Airline";

  const status =
    flight.flight_status ||
    "Unknown";

  const departureCode =
    flight.departure?.iata ||
    "N/A";

  const arrivalCode =
    flight.arrival?.iata ||
    "N/A";

  const departureAirport =
    flight.departure?.airport ||
    "Unknown Airport";

  const arrivalAirport =
    flight.arrival?.airport ||
    "Unknown Airport";

  const speed =
    flight.live?.speed_horizontal != null
      ? `${Math.round(
          flight.live.speed_horizontal
        )} km/h`
      : "N/A";

  const altitude =
    flight.live?.altitude != null
      ? `${Math.round(
          flight.live.altitude
        )} m`
      : "N/A";

  const position =
    flight.live?.latitude != null &&
    flight.live?.longitude != null
      ? `${flight.live.latitude.toFixed(
          2
        )}, ${flight.live.longitude.toFixed(2)}`
      : "N/A";

  return (
    <main className="min-h-screen bg-[#07111F] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">

      <div className="mx-auto max-w-6xl space-y-5 sm:space-y-8">

        {/* Header */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-8">

          <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center md:justify-between">

            <div className="min-w-0">

              <p className="text-base text-sky-400 sm:text-lg">
                {airline}
              </p>

              <h1 className="mt-2 wrap-break-word text-3xl font-bold text-white sm:text-5xl">
                {flightNumber}
              </h1>

              <p className="mt-3 text-sm text-gray-400 sm:text-base">
                {departureCode} → {arrivalCode}
              </p>

            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">

              <span className="h-3 w-3 shrink-0 animate-pulse rounded-full bg-green-400" />

              <span className="text-sm font-semibold text-green-400 sm:text-base">
                {status}
              </span>

            </div>

          </div>

        </section>


        {/* Route */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-8">

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Flight Route
          </h2>

          <div className="mt-8 flex flex-col items-center gap-8 md:mt-10 md:flex-row md:gap-6">

            <AirportPoint
              code={departureCode}
              name={departureAirport}
            />

            <div className="w-full flex-1">

              <div className="relative h-2 rounded-full bg-white/10">

                <div className="h-full w-1/2 rounded-full bg-sky-400" />

                <div className="absolute left-1/2 -top-4 -translate-x-1/2">

                  <div className="animate-pulse rounded-full bg-sky-500/20 p-3">

                    <Plane
                      size={22}
                      className="rotate-45 text-sky-400 sm:size-6"
                    />

                  </div>

                </div>

              </div>

            </div>

            <AirportPoint
              code={arrivalCode}
              name={arrivalAirport}
            />

          </div>

        </section>


        {/* Live Aircraft Data */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-8">

          <h2 className="mb-5 text-xl font-bold text-white sm:mb-6 sm:text-2xl">
            Live Aircraft Data
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">

            <InfoCard
              title="Speed"
              value={speed}
              icon={<Gauge size={22} />}
            />

            <InfoCard
              title="Altitude"
              value={altitude}
              icon={<Navigation size={22} />}
            />

            <InfoCard
              title="Position"
              value={position}
              icon={<MapPin size={22} />}
            />

            <InfoCard
              title="Aircraft"
              value={
                flight.aircraft?.iata ||
                flight.aircraft?.icao ||
                "N/A"
              }
              icon={<Plane size={22} />}
            />

          </div>

        </section>


        {/* Departure / Arrival */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 sm:gap-6">

          <AirportInfo
            title="Departure"
            airport={departureAirport}
            code={departureCode}
            terminal={flight.departure?.terminal}
            gate={flight.departure?.gate}
            time={
              flight.departure?.actual ||
              flight.departure?.estimated ||
              flight.departure?.scheduled
            }
          />

          <AirportInfo
            title="Arrival"
            airport={arrivalAirport}
            code={arrivalCode}
            terminal={flight.arrival?.terminal}
            gate={flight.arrival?.gate}
            time={
              flight.arrival?.actual ||
              flight.arrival?.estimated ||
              flight.arrival?.scheduled
            }
          />

        </section>


        {/* Flight Information */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-8">

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Flight Information
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 md:grid-cols-2 sm:gap-5">

            <InfoRow
              label="Airline"
              value={airline}
            />

            <InfoRow
              label="Status"
              value={status}
            />

            <InfoRow
              label="Airline Code"
              value={
                flight.airline?.iata ||
                flight.airline?.icao ||
                "N/A"
              }
            />

            <InfoRow
              label="Aircraft Registration"
              value={
                flight.aircraft?.registration ||
                "N/A"
              }
            />

            <InfoRow
              label="Departure"
              value={formatDateTime(
                flight.departure?.scheduled
              )}
            />

            <InfoRow
              label="Arrival"
              value={formatDateTime(
                flight.arrival?.scheduled
              )}
            />

          </div>

        </section>

      </div>

    </main>
  );
}

function AirportPoint({
  code,
  name,
}: {
  code: string;
  name: string;
}) {
  return (
    <div className="w-full min-w-0 text-center md:w-auto md:max-w-55">

      <p className="text-3xl font-bold text-white sm:text-4xl">
        {code}
      </p>

      <p className="mt-2 wrap-break-word text-sm text-gray-400 sm:text-base">
        {name}
      </p>

    </div>
  );
}

function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

      <div className="text-sky-400">
        {icon}
      </div>

      <p className="mt-4 text-sm text-gray-400">
        {title}
      </p>

      <p className="mt-2 wrap-break-word text-base font-semibold text-white sm:text-lg">
        {value}
      </p>

    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-black/20 p-5">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 wrap-break-word text-sm text-white sm:text-base">
        {value}
      </p>

    </div>
  );
}

function AirportInfo({
  title,
  airport,
  code,
  terminal,
  gate,
  time,
}: {
  title: string;
  airport: string;
  code: string;
  terminal?: string | null;
  gate?: string | null;
  time?: string | null;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-8">

      <h2 className="text-xl font-bold text-white sm:text-2xl">
        {title}
      </h2>

      <p className="mt-5 text-3xl font-bold text-sky-400 sm:text-4xl">
        {code}
      </p>

      <p className="mt-2 wrap-break-word text-sm text-gray-300 sm:text-base">
        {airport}
      </p>

      <div className="mt-6 space-y-3 text-sm text-gray-400 sm:text-base">

        <p>
          Terminal:{" "}
          <span className="text-white">
            {terminal || "N/A"}
          </span>
        </p>

        <p>
          Gate:{" "}
          <span className="text-white">
            {gate || "N/A"}
          </span>
        </p>

        <p className="flex items-start gap-2">

          <Clock
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span className="wrap-break-word text-white">
            {formatDateTime(time)}
          </span>

        </p>

      </div>

    </section>
  );
}