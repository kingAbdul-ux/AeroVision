import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Plane, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Flights",
      path: "/flights",
    },
    {
      name: "Airports",
      path: "/airports",
    },
    {
      name: "Live Map",
      path: "/map",
    },
    {
      name: "Weather",
      path: "/weather",
    },
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-2000 border-b border-white/10 bg-[#050B16]/95 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

        {/* Logo */}

        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <Plane
            size={30}
            className="text-sky-400"
          />

          <h1 className="text-xl font-bold text-white sm:text-2xl">
            AeroVision
          </h1>
        </Link>


        {/* Desktop navigation */}

        <div className="hidden items-center gap-8 md:flex">

          {links.map((link) => (
            <NavItem
              key={link.path}
              name={link.name}
              path={link.path}
              active={location.pathname === link.path}
            />
          ))}

        </div>


        {/* Mobile menu button */}

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white transition hover:border-sky-400/50 hover:text-sky-400 md:hidden"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>


      {/* Mobile navigation */}

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#050B16] px-4 pb-4 md:hidden">

          <div className="mx-auto max-w-7xl space-y-2 pt-3">

            {links.map((link) => (
              <MobileNavItem
                key={link.path}
                name={link.name}
                path={link.path}
                active={location.pathname === link.path}
                onClick={closeMenu}
              />
            ))}

          </div>

        </div>
      )}

    </nav>
  );
}


function NavItem({
  name,
  path,
  active,
}: {
  name: string;
  path: string;
  active: boolean;
}) {
  return (
    <Link
      to={path}
      className={`relative text-sm font-medium transition duration-300 ${
        active
          ? "text-sky-400"
          : "text-gray-300 hover:text-sky-400"
      }`}
    >
      {name}

      {active && (
        <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-sky-400" />
      )}
    </Link>
  );
}


function MobileNavItem({
  name,
  path,
  active,
  onClick,
}: {
  name: string;
  path: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`block rounded-xl px-4 py-3 font-medium transition ${
        active
          ? "bg-sky-500/10 text-sky-400"
          : "text-gray-300 hover:bg-white/5 hover:text-sky-400"
      }`}
    >
      {name}
    </Link>
  );
}