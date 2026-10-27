import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import plane from "../../assets/images/plane.png";
import SearchBar from "../SearchBar/SearchBar";

import { fetchAircraft } from "../../services/flightservice";

type HeroStats = {
  aircraft: number;
  countries: number;
};

export default function Hero() {
  const [stats, setStats] = useState<HeroStats>({
    aircraft: 0,
    countries: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const aircraftData = await fetchAircraft();

        const countries = new Set(
          aircraftData
            .map((aircraft) => aircraft.country)
            .filter(Boolean)
        );

        if (!cancelled) {
          setStats({
            aircraft: aircraftData.length,
            countries: countries.size,
          });
        }
      } catch (err) {
        console.error("Hero statistics error:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-68px)] overflow-hidden border-b border-[#9ab7c3]/15 bg-[#08121b]">

      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(115deg, transparent 20%, rgba(245,185,66,.08) 20.2%, transparent 20.5%), linear-gradient(295deg, transparent 58%, rgba(99,177,202,.08) 58.2%, transparent 58.5%)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:pt-32">

        <div className="mb-8 flex items-center gap-3 text-[#91aab5]">
          <span className="h-2 w-2 rounded-full bg-[#5ee6a8] shadow-[0_0_12px_#5ee6a8]" />
          <span className="eyebrow">Live airspace network / operational</span>
          <span className="hidden h-px flex-1 bg-[#9ab7c3]/20 sm:block" />
          <span className="mono-data hidden text-[10px] sm:block">UTC 14:32:08</span>
        </div>

        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-10">

          <motion.div
            className="w-full max-w-xl text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <p className="eyebrow">
              Air traffic intelligence platform
            </p>

            <h1 className="display-heading mt-4 text-5xl font-bold leading-[0.9] text-white sm:mt-5 sm:text-7xl md:text-8xl">
              Above the

              <span className="block text-[#f5b942]">
                ordinary.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#a7bbc2] sm:mt-6 sm:text-lg lg:mx-0">
              Track the world&apos;s aircraft in motion. Read the network, find your flight, and keep a clear view of the sky.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">

              <Link
                to="/flights"
                className="border border-[#f5b942] bg-[#f5b942] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.1em] text-[#08121b] transition hover:bg-[#ffd16b]"
              >
                Explore Flights
              </Link>

              <Link
                to="/dashboard"
                className="border border-[#9ab7c3]/30 px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.1em] text-white transition hover:border-[#f5b942] hover:text-[#f5b942]"
              >
                View Dashboard
              </Link>

            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-6 sm:mt-12 lg:justify-start">

              <div>
                <h2 className="mono-data text-2xl font-medium text-white sm:text-3xl">
                  {loading
                    ? "..."
                    : stats.aircraft.toLocaleString()}
                </h2>

                <p className="eyebrow mt-1 text-[#91aab5]">
                  Live Aircraft
                </p>
              </div>

              <div>
                <h2 className="mono-data text-2xl font-medium text-white sm:text-3xl">
                  {loading
                    ? "..."
                    : stats.countries.toLocaleString()}
                </h2>

                <p className="eyebrow mt-1 text-[#91aab5]">
                  Countries Tracked
                </p>
              </div>

              <div>
                <h2 className="mono-data text-2xl font-medium text-white sm:text-3xl">
                  {loading ? "..." : "Live"}
                </h2>

                <p className="eyebrow mt-1 text-[#91aab5]">
                  Aircraft Tracking
                </p>
              </div>

            </div>

          </motion.div>

          <motion.div
            className="flex w-full justify-center lg:w-auto lg:flex-1 lg:justify-end"
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -15, 0],
            }}
            transition={{
              opacity: {
                duration: 0.8,
              },
              x: {
                duration: 0.8,
              },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <img
              src={plane}
              alt="Commercial Aircraft"
              className="w-full max-w-xs object-contain drop-shadow-2xl sm:max-w-md lg:max-w-2xl"
            />
          </motion.div>

        </div>

        <div className="mx-auto mt-10 w-full max-w-4xl sm:mt-12">
          <SearchBar />
        </div>

      </div>
    </section>
  );
}