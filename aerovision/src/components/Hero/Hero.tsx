import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import plane from "../../assets/images/plane.png";
import SearchBar from "../SearchBar/SearchBar";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07111F]">

      {/* Background glow */}
      <div className="absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl sm:h-96 sm:w-96 lg:h-125 lg:w-125" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:pt-32">

        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-center lg:gap-10">

          {/* Text Section */}
          <motion.div
            className="w-full max-w-xl text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <p className="text-base font-medium text-sky-400 sm:text-lg">
              Modern Aviation Platform
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:mt-5 sm:text-5xl md:text-6xl">
              Explore the World

              <span className="block text-sky-400">
                From Above
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-gray-300 sm:mt-6 sm:text-lg lg:mx-0">
              Discover flights, airports, aircraft,
              airlines, weather and aviation intelligence
              in one powerful platform.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">

              <Link
                to="/flights"
                className="rounded-full bg-sky-500 px-7 py-3 text-center font-semibold text-white transition hover:bg-sky-400"
              >
                Explore Flights
              </Link>

              <Link
                to="/dashboard"
                className="rounded-full border border-white/20 px-7 py-3 text-center font-semibold text-white transition hover:bg-white/10"
              >
                View Dashboard
              </Link>

            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-6 sm:mt-12 lg:justify-start">

              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  12K+
                </h2>

                <p className="mt-1 text-sm text-gray-400 sm:text-base">
                  Flights
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  950+
                </h2>

                <p className="mt-1 text-sm text-gray-400 sm:text-base">
                  Airports
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  320+
                </h2>

                <p className="mt-1 text-sm text-gray-400 sm:text-base">
                  Airlines
                </p>
              </div>

            </div>

          </motion.div>


          {/* Aircraft Image */}
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


        {/* Flight Search */}
        <div className="mx-auto mt-10 w-full max-w-4xl sm:mt-12">
          <SearchBar />
        </div>

      </div>

    </section>
  );
}