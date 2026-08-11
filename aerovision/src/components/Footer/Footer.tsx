import { Plane } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-[#050B16] border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">


          <div>

            <div className="flex items-center gap-3">

              <Plane
                size={30}
                className="text-sky-400"
              />

              <h2 className="text-2xl font-bold text-white">
                AeroVision
              </h2>

            </div>


            <p className="mt-5 text-gray-400 leading-7">
              Explore flights, aircraft and airports
              around the world with AeroVision.
            </p>

          </div>



          <div>

            <h3 className="text-white font-semibold mb-4">
              Explore
            </h3>


            <ul className="space-y-3 text-gray-400">

              <li>Flights</li>
              <li>Airports</li>
              <li>Aircraft</li>
              <li>Live Map</li>

            </ul>

          </div>




          <div>

            <h3 className="text-white font-semibold mb-4">
              Company
            </h3>


            <ul className="space-y-3 text-gray-400">

              <li>About</li>
              <li>Contact</li>
              <li>Privacy</li>
              <li>Terms</li>

            </ul>

          </div>




          <div>

            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>


            <p className="text-gray-400">
              aviation@aerovision.com
            </p>


            <p className="text-gray-400 mt-2">
              Global Aviation Platform
            </p>


          </div>


        </div>


        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500">

          © 2026 AeroVision. All rights reserved.

        </div>


      </div>

    </footer>
  );
}