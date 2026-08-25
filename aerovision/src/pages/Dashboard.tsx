import { useEffect, useState, type ReactNode } from "react";

import PageNavigation from "../components/PageNavigation/PageNavigation";

import { fetchAircraft } from "../services/flightservice";
import { getLiveFlights } from "../api/aviationApi";

import {
  Plane,
  Globe2,
  Radio,
  Activity,
} from "lucide-react";


type DashboardStats = {
  aircraft: number;
  flights: number;
  countries: number;
};


export default function Dashboard() {

  const [stats, setStats] = useState<DashboardStats>({
    aircraft: 0,
    flights: 0,
    countries: 0,
  });

  const [loadingAircraft, setLoadingAircraft] = useState(true);
  const [loadingFlights, setLoadingFlights] = useState(true);

  const [aircraftError, setAircraftError] = useState("");
  const [flightError, setFlightError] = useState("");


  useEffect(() => {

    async function loadAircraftStats() {

      try {

        setLoadingAircraft(true);
        setAircraftError("");

        const aircraftData = await fetchAircraft();

        const countries = new Set(
          aircraftData
            .map((plane) => plane.country)
            .filter(Boolean)
        );

        setStats((current) => ({
          ...current,
          aircraft: aircraftData.length,
          countries: countries.size,
        }));

      } catch (err) {

        console.error(
          "OpenSky Dashboard error:",
          err
        );

        setAircraftError(
          err instanceof Error
            ? err.message
            : "Unable to load OpenSky data."
        );

      } finally {

        setLoadingAircraft(false);

      }

    }


    async function loadFlightStats() {

      try {

        setLoadingFlights(true);
        setFlightError("");

        const flightData = await getLiveFlights();

        setStats((current) => ({
          ...current,
          flights: flightData?.data?.length ?? 0,
        }));

      } catch (err) {

        console.error(
          "AviationStack Dashboard error:",
          err
        );

        setFlightError(
          err instanceof Error
            ? err.message
            : "Unable to load AviationStack data."
        );

      } finally {

        setLoadingFlights(false);

      }

    }


    loadAircraftStats();
    loadFlightStats();

  }, []);


  const systemOnline =
    !aircraftError &&
    !flightError &&
    !loadingAircraft &&
    !loadingFlights;


  return (

    <main className="min-h-screen bg-[#07111F]">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <p className="text-lg text-sky-400">
          AeroVision
        </p>

        <h1 className="mt-3 text-5xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-4 text-lg text-gray-400">
          Your central aviation command center.
        </p>


        {/* Statistics */}

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Live Aircraft"
            value={
              loadingAircraft
                ? "..."
                : stats.aircraft.toString()
            }
            description="Aircraft currently tracked"
            icon={<Plane size={26} />}
          />


          <StatCard
            title="Flights"
            value={
              loadingFlights
                ? "..."
                : stats.flights.toString()
            }
            description="Flights returned by AviationStack"
            icon={<Radio size={26} />}
          />


          <StatCard
            title="Countries"
            value={
              loadingAircraft
                ? "..."
                : stats.countries.toString()
            }
            description="Countries represented by aircraft"
            icon={<Globe2 size={26} />}
          />


          <StatCard
            title="System Status"
            value={
              loadingAircraft || loadingFlights
                ? "Checking"
                : systemOnline
                ? "Online"
                : "Partial"
            }
            description={
              loadingAircraft || loadingFlights
                ? "Checking API connections"
                : systemOnline
                ? "All connected services are working"
                : "One or more services need attention"
            }
            icon={<Activity size={26} />}
          />

        </div>


        {/* OpenSky error */}

        {aircraftError && (

          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

            <p className="text-sm font-semibold text-red-300">
              OpenSky
            </p>

            <p className="mt-1 text-red-400">
              {aircraftError}
            </p>

          </div>

        )}


        {/* AviationStack error */}

        {flightError && (

          <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

            <p className="text-sm font-semibold text-red-300">
              AviationStack
            </p>

            <p className="mt-1 text-red-400">
              {flightError}
            </p>

          </div>

        )}

      </div>


      <PageNavigation />

    </main>

  );
}


function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}) {

  return (

    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/40">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10">

        <span className="text-sky-400">
          {icon}
        </span>

      </div>

      <p className="mt-6 text-sm text-gray-400">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-bold text-white">
        {value}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>

    </div>

  );
}