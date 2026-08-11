type FlightPanelProps = {
  flight: {
    id: string;
    airline: string;
    aircraft: string;
    route: string;
    altitude: string;
    speed: string;
    status: string;
  };
};


export default function FlightPanel({
  flight,
}: FlightPanelProps) {

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

      <h2 className="text-2xl font-bold text-white">
        {flight.id}
      </h2>


      <p className="text-sky-400 mt-2">
        {flight.airline}
      </p>


      <div className="mt-6 space-y-4 text-gray-300">


        <div>
          <p className="text-sm text-gray-500">
            Aircraft
          </p>

          <p className="text-white">
            {flight.aircraft}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Route
          </p>

          <p className="text-white">
            {flight.route}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <p className="text-green-400">
            {flight.status}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Altitude
          </p>

          <p className="text-white">
            {flight.altitude}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Speed
          </p>

          <p className="text-white">
            {flight.speed}
          </p>
        </div>


      </div>


    </div>
  );
}