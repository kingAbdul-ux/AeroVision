type AirportCardProps = {
  name: string;
  code: string;
  location: string;
  passengers: string;
  image: string;
};


export default function AirportCard({
  name,
  code,
  location,
  passengers,
  image,
}: AirportCardProps) {

  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-2 transition duration-300">

      {/* Image */}
      <div className="h-52 overflow-hidden">

        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

      </div>


      {/* Content */}
      <div className="p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            {name}
          </h2>


          <span className="rounded-lg bg-sky-500/20 px-3 py-1 text-sky-400 font-bold">
            {code}
          </span>

        </div>


        <p className="mt-3 text-gray-400">
          {location}
        </p>


        <div className="mt-5 border-t border-white/10 pt-4">

          <p className="text-gray-400 text-sm">
            Annual Passengers
          </p>

          <p className="text-white font-semibold text-lg">
            {passengers}
          </p>

        </div>


      </div>

    </div>
  );
}