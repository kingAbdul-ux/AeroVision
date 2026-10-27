import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#9ab7c3]/20 bg-[#071018]">

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand */}

          <div>

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <Plane size={26} className="text-[#f5b942]" />

              <h2 className="display-heading text-xl font-bold text-white sm:text-2xl">
                AeroVision
              </h2>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#91aab5] sm:text-base">
              Explore flights, aircraft and airports
              around the world with AeroVision.
            </p>

          </div>


          {/* Explore */}

          <div>

            <h3 className="mb-4 font-semibold text-white">
              Explore
            </h3>

            <ul className="space-y-3 text-sm text-gray-400 sm:text-base">

              <li>
                <Link
                  to="/flights"
                  className="transition hover:text-sky-400"
                >
                  Flights
                </Link>
              </li>

              <li>
                <Link
                  to="/airports"
                  className="transition hover:text-sky-400"
                >
                  Airports
                </Link>
              </li>

              <li>
                <Link
                  to="/map"
                  className="transition hover:text-sky-400"
                >
                  Live Map
                </Link>
              </li>

              <li>
                <Link
                  to="/weather"
                  className="transition hover:text-sky-400"
                >
                  Weather
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="transition hover:text-sky-400"
                >
                  Dashboard
                </Link>
              </li>

            </ul>

          </div>


          {/* Company */}

          <div>

            <h3 className="mb-4 font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-gray-400 sm:text-base">

              <li>
                <button
                  type="button"
                  className="transition hover:text-sky-400"
                >
                  About
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="transition hover:text-sky-400"
                >
                  Contact
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="transition hover:text-sky-400"
                >
                  Privacy
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="transition hover:text-sky-400"
                >
                  Terms
                </button>
              </li>

            </ul>

          </div>


          {/* Contact */}

          <div>

            <h3 className="mb-4 font-semibold text-white">
              Contact
            </h3>

            <a
              href="mailto:aviation@aerovision.com"
              className="wrap-break-word text-sm text-gray-400 transition hover:text-sky-400 sm:text-base"
            >
              aviation@aerovision.com
            </a>

            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Global Aviation Platform
            </p>

          </div>

        </div>


        {/* Copyright */}

        <div className="mt-10 border-t border-white/10 pt-6 text-center">

          <p className="text-xs text-gray-500 sm:text-sm">
            © 2026 AeroVision. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}