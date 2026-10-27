type AirportCardProps = {
  name: string;
  code: string;
  location: string;
  coordinates: string;
  icao: string;
  timeZone: string;
  runways: number;
  image: string;
};

export default function AirportCard({
  name,
  code,
  location,
  coordinates,
  icao,
  timeZone,
  runways,
  image,
}: AirportCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-sky-400/40">

      {/* Image */}

      <div className="h-48 overflow-hidden sm:h-52">

        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

      </div>


      {/* Content */}

      <div className="p-5 sm:p-6">

        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">

            <h2 className="wrap-break-word text-xl font-bold text-white sm:text-2xl">
              {name}
            </h2>

          </div>

          <span className="shrink-0 rounded-lg bg-sky-500/20 px-3 py-1 text-sm font-bold text-sky-400">
            {code}
          </span>

        </div>


        <p className="mt-3 wrap-break-word text-sm text-gray-400 sm:text-base">
          {location}
        </p>


        {/* Real airport data */}

        <div className="mt-5 space-y-3 border-t border-white/10 pt-4">

          <div>
            <p className="text-xs text-gray-500 sm:text-sm">
              Coordinates
            </p>

            <p className="mt-1 wrap-break-word text-sm text-white">
              {coordinates}
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-500 sm:text-sm">
              ICAO
            </p>

            <p className="mt-1 text-sm text-white">
              {icao}
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-500 sm:text-sm">
              Time Zone
            </p>

            <p className="mt-1 wrap-break-word text-sm text-white">
              {timeZone}
            </p>
          </div>


          <div>
            <p className="text-xs text-gray-500 sm:text-sm">
              Runways
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {runways}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}