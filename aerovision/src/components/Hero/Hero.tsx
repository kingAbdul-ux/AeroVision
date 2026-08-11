import { motion } from "framer-motion";
import plane from "../../assets/images/plane.png";
import SearchBar from "../SearchBar/SearchBar";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07111F]">

      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-125 h-125 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Text Section */}
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <p className="text-sky-400 text-lg font-medium">
              Modern Aviation Platform
            </p>


            <h1 className="mt-5 text-5xl md:text-6xl font-extrabold text-white leading-tight">

              Explore the World

              <span className="block text-sky-400">
                From Above
              </span>

            </h1>


            <p className="mt-6 text-gray-300 text-lg leading-relaxed">

              Discover flights, airports, aircraft,
              airlines, weather and aviation intelligence
              in one powerful platform.

            </p>


            <div className="mt-8 flex flex-wrap gap-4">

              <button
                className="rounded-full bg-sky-500 px-8 py-3 text-white font-semibold hover:bg-sky-600 transition"
              >
                Explore Flights
              </button>


              <button
                className="rounded-full border border-white/20 px-8 py-3 text-white hover:bg-white/10 transition"
              >
                Learn More
              </button>

            </div>


            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-10">


              <div>
                <h2 className="text-3xl font-bold text-white">
                  12K+
                </h2>
                <p className="text-gray-400">
                  Flights
                </p>
              </div>


              <div>
                <h2 className="text-3xl font-bold text-white">
                  950+
                </h2>
                <p className="text-gray-400">
                  Airports
                </p>
              </div>


              <div>
                <h2 className="text-3xl font-bold text-white">
                  320+
                </h2>
                <p className="text-gray-400">
                  Airlines
                </p>
              </div>


            </div>


          </motion.div>



          {/* Aircraft Image */}
          <motion.div

            className="w-full lg:w-auto"

            initial={{
              opacity: 0,
              x: 80
            }}

            animate={{
              opacity: 1,
              x: 0,
              y: [0, -15, 0]
            }}

            transition={{
              opacity: {
                duration: 0.8
              },

              x: {
                duration: 0.8
              },

              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}

          >

            <img
              src={plane}
              alt="Commercial Aircraft"
              className="w-162.5 max-w-full drop-shadow-2xl"
            />

          </motion.div>


        </div>



        {/* Flight Search */}
        <div className="mt-10">

          <SearchBar />

        </div>


      </div>


    </section>
  );
}