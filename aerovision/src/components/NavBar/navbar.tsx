import { Link } from "react-router-dom";
import { Plane } from "lucide-react";


export default function Navbar() {

  return (

    <nav className="bg-[#050B16] border-b border-white/10 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">


        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <Plane
            size={32}
            className="text-sky-400"
          />


          <h1 className="text-2xl font-bold text-white">
            AeroVision
          </h1>


        </Link>




        {/* Navigation */}

        <div className="hidden md:flex items-center gap-8">


          <NavItem
            name="Home"
            path="/"
          />


          <NavItem
            name="Dashboard"
            path="/dashboard"
          />


          <NavItem
            name="Flights"
            path="/flights"
          />


          <NavItem
            name="Airports"
            path="/airports"
          />


          <NavItem
            name="Live Map"
            path="/map"
          />


          <NavItem
            name="Weather"
            path="/weather"
          />


        </div>


      </div>

    </nav>

  );

}




function NavItem({

  name,

  path,

}:{

  name:string;

  path:string;

}) {


  return (

    <Link

      to={path}

      className="text-gray-300 hover:text-sky-400 transition duration-300"

    >

      {name}

    </Link>

  );

}