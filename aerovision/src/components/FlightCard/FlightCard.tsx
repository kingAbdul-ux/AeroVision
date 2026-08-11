import { useNavigate } from "react-router-dom";


type FlightCardProps = {
  flightNumber: string;
  airline: string;
  from: string;
  to: string;
  time: string;
  status: string;
};


export default function FlightCard({
  flightNumber,
  airline,
  from,
  to,
  time,
  status,
}: FlightCardProps) {


  const navigate = useNavigate();


  return (
    <div
      onClick={() => navigate(`/flight/${flightNumber}`)}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-sky-400 transition cursor-pointer"
    >


      <div className="flex justify-between items-center">


        <div>

          <h2 className="text-xl font-bold text-white">
            {flightNumber}
          </h2>

          <p className="text-sky-400">
            {airline}
          </p>

        </div>


        <span className="rounded-full bg-green-500/20 px-4 py-1 text-green-400 text-sm">
          {status}
        </span>


      </div>



      <div className="mt-6 flex items-center justify-between">


        <div>

          <p className="text-gray-400 text-sm">
            Departure
          </p>

          <p className="text-white font-semibold">
            {from}
          </p>

        </div>


        <div className="text-sky-400 text-xl">
          ✈
        </div>


        <div>

          <p className="text-gray-400 text-sm">
            Arrival
          </p>

          <p className="text-white font-semibold">
            {to}
          </p>

        </div>


      </div>



      <div className="mt-5 text-gray-300">

        Departure Time:

        <span className="text-white ml-2">
          {time}
        </span>

      </div>


      <p className="mt-5 text-sky-400 text-sm">
        Click to view flight details →
      </p>


    </div>
  );
}