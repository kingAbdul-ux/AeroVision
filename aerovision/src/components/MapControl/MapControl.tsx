import { useState } from "react";

type Aircraft = {
  icao24: string;
  callsign: string | null;
  country: string;
  latitude: number;
  longitude: number;
  altitude: number | null;
  velocity: number | null;
  heading: number | null;
};

type MapControlProps = {
  aircraft: Aircraft[];
  selectedAircraft: Aircraft | null;
  onSelect: (aircraft: Aircraft) => void;
};

export default function MapControl({
  aircraft,
  selectedAircraft,
  onSelect,
}: MapControlProps) {
  const [search, setSearch] = useState("");

  const searchValue = search.toLowerCase().trim();

  const filteredAircraft = aircraft.filter((plane) => {
    const callsign = (plane.callsign || "").toLowerCase();
    const country = plane.country.toLowerCase();
    const icao24 = plane.icao24.toLowerCase();

    return (
      callsign.includes(searchValue) ||
      country.includes(searchValue) ||
      icao24.includes(searchValue)
    );
  });

  return (
    <div className="absolute left-4 top-4 z-1000 w-[320px] max-w-[calc(100%-2rem)] rounded-3xl border border-white/10 bg-[#050B16]/95 p-5 shadow-2xl backdrop-blur-xl">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Active Aircraft
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            {aircraft.length} aircraft detected
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
          <span className="h-3 w-3 animate-pulse rounded-full bg-green-400" />
        </div>
      </div>

      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search callsign or country..."
        className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-sky-400"
      />

      <div className="mt-5 max-h-125 space-y-2 overflow-y-auto pr-1">

        {filteredAircraft.map((plane) => {
          const isSelected =
            selectedAircraft?.icao24 === plane.icao24;

          return (
            <button
              key={plane.icao24}
              type="button"
              onClick={() => onSelect(plane)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                isSelected
                  ? "border-sky-400/60 bg-sky-500/10"
                  : "border-white/5 bg-white/5 hover:border-sky-400/40 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">
                    {plane.callsign || "Unknown Aircraft"}
                  </p>

                  <p className="mt-1 truncate text-sm text-gray-400">
                    {plane.country}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-sky-400">
                  View
                </span>

              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-400">

                <span>
                  Alt:{" "}
                  {plane.altitude !== null
                    ? `${Math.round(plane.altitude)} m`
                    : "N/A"}
                </span>

                <span>
                  Speed:{" "}
                  {plane.velocity !== null
                    ? `${Math.round(
                        plane.velocity * 3.6
                      )} km/h`
                    : "N/A"}
                </span>

              </div>
            </button>
          );
        })}

        {filteredAircraft.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-500">
            No aircraft found.
          </div>
        )}

      </div>
    </div>
  );
}