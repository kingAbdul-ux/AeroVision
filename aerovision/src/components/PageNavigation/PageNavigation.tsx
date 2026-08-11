import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Plane,
  Map,
  CloudSun,
  Building2,
} from "lucide-react";


const pages = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Flights",
    path: "/flights",
    icon: Plane,
  },
  {
    name: "Airports",
    path: "/airports",
    icon: Building2,
  },
  {
    name: "Live Map",
    path: "/map",
    icon: Map,
  },
  {
    name: "Weather",
    path: "/weather",
    icon: CloudSun,
  },
];


export default function PageNavigation() {

  const location = useLocation();


  return (

    <section className="bg-[#07111F] px-6 py-12">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <p className="text-sky-400 text-sm font-medium">
            Explore AeroVision
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            Aviation Tools
          </h2>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">


          {pages.map((page) => {

            const Icon = page.icon;

            const isActive =
              location.pathname === page.path;


            return (

              <Link
                key={page.path}
                to={page.path}
                className={`
                  group
                  rounded-2xl
                  border
                  p-5
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "border-sky-400/60 bg-sky-500/10"
                      : "border-white/10 bg-white/5 hover:border-sky-400/50 hover:bg-white/10"
                  }
                `}
              >

                <div
                  className={`
                    w-11
                    h-11
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${
                      isActive
                        ? "bg-sky-500/20"
                        : "bg-white/5 group-hover:bg-sky-500/10"
                    }
                  `}
                >

                  <Icon
                    size={24}
                    className="text-sky-400"
                  />

                </div>


                <h3 className="text-white font-semibold mt-4">

                  {page.name}

                </h3>


                <p className="text-gray-500 text-sm mt-1">

                  {isActive
                    ? "You are here"
                    : "Open page →"}

                </p>

              </Link>

            );

          })}


        </div>

      </div>

    </section>

  );
}