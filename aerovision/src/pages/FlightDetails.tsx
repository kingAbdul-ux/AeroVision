import { useParams } from "react-router-dom";
import { Plane, Clock, Gauge, Navigation } from "lucide-react";


const flights = [
  {
    id: "EK202",
    airline: "Emirates",
    aircraft: "Airbus A380",
    from: "Dubai (DXB)",
    to: "New York (JFK)",
    departure: "09:30 AM",
    arrival: "03:45 PM",
    status: "Flying",
    altitude: "38,000 ft",
    speed: "890 km/h",
    progress: 65,
  },

  {
    id: "BA117",
    airline: "British Airways",
    aircraft: "Boeing 787 Dreamliner",
    from: "London (LHR)",
    to: "New York (JFK)",
    departure: "11:45 AM",
    arrival: "02:30 PM",
    status: "Boarding",
    altitude: "Ground",
    speed: "0 km/h",
    progress: 10,
  },

];


export default function FlightDetails() {

  const { id } = useParams();


  const flight = flights.find(
    (item)=> item.id === id
  );


  if (!flight) {

    return (

      <div className="min-h-screen bg-[#07111F] flex items-center justify-center text-white">

        Flight not found

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-[#07111F] px-6 py-20">


      <div className="max-w-6xl mx-auto space-y-8">



        {/* Header */}

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">


          <div className="flex flex-col md:flex-row justify-between gap-6">


            <div>

              <p className="text-sky-400">
                {flight.airline}
              </p>


              <h1 className="text-5xl font-bold text-white mt-2">
                {flight.id}
              </h1>


              <p className="text-gray-400 mt-3">
                {flight.aircraft}
              </p>

            </div>



            <div className="flex items-center gap-3">

              <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></span>

              <p className="text-green-400 text-xl">
                {flight.status}
              </p>

            </div>


          </div>


        </div>





        {/* Aircraft Layout */}

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">


          <h2 className="text-2xl font-bold text-white mb-8">
            Aircraft Tracking
          </h2>


          <div className="relative flex items-center justify-center">


            <div className="h-40 w-40 rounded-full bg-sky-500/20 flex items-center justify-center animate-pulse">


              <Plane
                size={80}
                className="text-sky-400 rotate-45"
              />


            </div>


          </div>


          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">


            <InfoCard
              icon={<Gauge />}
              title="Speed"
              value={flight.speed}
            />


            <InfoCard
              icon={<Navigation />}
              title="Altitude"
              value={flight.altitude}
            />


            <InfoCard
              icon={<Clock />}
              title="Departure"
              value={flight.departure}
            />


            <InfoCard
              icon={<Plane />}
              title="Aircraft"
              value={flight.aircraft}
            />


          </div>


        </div>





        {/* Route Timeline */}

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">


          <h2 className="text-2xl font-bold text-white mb-8">
            Flight Route
          </h2>


          <div>


            <div className="flex justify-between text-white">


              <div>

                <p className="text-3xl font-bold">
                  DXB
                </p>

                <p className="text-gray-400">
                  Dubai
                </p>

              </div>



              <div>

                <p className="text-3xl font-bold">
                  JFK
                </p>

                <p className="text-gray-400">
                  New York
                </p>

              </div>


            </div>




          <div className="relative mt-10">


  <div className="h-2 bg-white/10 rounded-full">


    <div
      className="h-full bg-sky-400 rounded-full transition-all duration-1000"
      style={{
        width:`${flight.progress}%`
      }}
    />


  </div>



  <div
    className="absolute -top-7 transition-all duration-1000"
    style={{
      left:`${flight.progress}%`,
      transform:"translateX(-50%)"
    }}
  >

    <div className="bg-sky-500/20 p-3 rounded-full animate-pulse">

      <Plane
        className="text-sky-400 rotate-45"
        size={28}
      />

    </div>


  </div>


</div>


            <p className="text-center text-gray-400 mt-4">

              {flight.progress}% completed

            </p>


          </div>


        </div>


      </div>


    </div>

  );

}




function InfoCard({
  icon,
  title,
  value,
}:{
  icon:React.ReactNode;
  title:string;
  value:string;
}){

  return (

    <div className="rounded-2xl bg-black/20 border border-white/10 p-5">

      <div className="text-sky-400">
        {icon}
      </div>


      <p className="text-gray-400 mt-3">
        {title}
      </p>


      <p className="text-white font-semibold mt-1">
        {value}
      </p>


    </div>

  );

}