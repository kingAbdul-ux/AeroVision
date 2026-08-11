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


      <div className="h-48 overflow-hidden">

        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

      </div>


      <div className="p-6">


        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold text-white">
            {name}
          </h2>


          <span className="text-sky-400 font-bold">
            {code}
          </span>

        </div>


        <p className="text-gray-400 mt-3">
          {location}
        </p>


        <div className="mt-5 text-gray-300">

          <p>
            Annual Passengers:
          </p>

          <span className="text-white font-semibold">
            {passengers}
          </span>

        </div>


      </div>


    </div>
  );
}