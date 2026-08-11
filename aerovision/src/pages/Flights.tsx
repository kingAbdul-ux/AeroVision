import { useState } from "react";
import { useNavigate } from "react-router-dom";


const flights = [
  {
    id: "EK202",
    airline: "Emirates",
    from: "DXB",
    to: "JFK",
    aircraft: "Airbus A380",
    status: "Flying",
  },

  {
    id: "BA117",
    airline: "British Airways",
    from: "LHR",
    to: "JFK",
    aircraft: "Boeing 787",
    status: "Boarding",
  },

  {
    id: "SQ12",
    airline: "Singapore Airlines",
    from: "SIN",
    to: "HND",
    aircraft: "Airbus A350",
    status: "Delayed",
  },

  {
    id: "QR908",
    airline: "Qatar Airways",
    from: "DOH",
    to: "SYD",
    aircraft: "Boeing 777",
    status: "Flying",
  },
];



export default function Flights(){

  const navigate = useNavigate();

  const [search,setSearch] = useState("");



  const filteredFlights = flights.filter((flight)=>

    flight.id
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    flight.airline
      .toLowerCase()
      .includes(search.toLowerCase())

  );



  return (

    <div className="min-h-screen bg-[#07111F] px-6 py-20">


      <div className="max-w-7xl mx-auto">


        <h1 className="text-5xl font-bold text-white">
          Flight Explorer
        </h1>


        <p className="text-gray-400 mt-3">
          Search and monitor global flights.
        </p>



        <input

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Search flight or airline..."

          className="mt-10 w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"

        />



        <div className="grid md:grid-cols-2 gap-6 mt-10">


          {
            filteredFlights.map((flight)=>(


              <div

                key={flight.id}

                onClick={()=>navigate(`/flight/${flight.id}`)}

                className="cursor-pointer rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-sky-400 transition"

              >


                <div className="flex justify-between">


                  <div>

                    <h2 className="text-2xl font-bold text-white">
                      {flight.id}
                    </h2>


                    <p className="text-sky-400">
                      {flight.airline}
                    </p>

                  </div>



                  <span className="text-green-400">
                    {flight.status}
                  </span>


                </div>



                <div className="mt-6 flex justify-between text-white">


                  <div>

                    <p className="text-gray-400">
                      From
                    </p>

                    {flight.from}

                  </div>



                  <div>
                    ✈
                  </div>



                  <div>

                    <p className="text-gray-400">
                      To
                    </p>

                    {flight.to}

                  </div>


                </div>



                <p className="mt-5 text-gray-400">
                  {flight.aircraft}
                </p>


              </div>


            ))
          }


        </div>


      </div>


    </div>

  );

}