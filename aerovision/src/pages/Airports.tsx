import { useState } from "react";
import { MapPin, Users } from "lucide-react";


const airports = [

  {
    name: "Dubai International Airport",
    code: "DXB",
    location: "Dubai, United Arab Emirates",
    passengers: "86 million",
  },


  {
    name: "London Heathrow Airport",
    code: "LHR",
    location: "London, United Kingdom",
    passengers: "74 million",
  },


  {
    name: "Singapore Changi Airport",
    code: "SIN",
    location: "Singapore",
    passengers: "68 million",
  },


  {
    name: "Tokyo Haneda Airport",
    code: "HND",
    location: "Tokyo, Japan",
    passengers: "78 million",
  },


  {
    name: "John F. Kennedy International Airport",
    code: "JFK",
    location: "New York, USA",
    passengers: "62 million",
  },

];



export default function Airports() {


  const [search,setSearch] = useState("");



  const filteredAirports = airports.filter((airport)=>

    airport.name
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    airport.code
      .toLowerCase()
      .includes(search.toLowerCase())

  );



  return (

    <div className="min-h-screen bg-[#07111F] px-6 py-20">


      <div className="max-w-7xl mx-auto">


        <h1 className="text-5xl font-bold text-white">
          Airport Explorer
        </h1>


        <p className="text-gray-400 mt-3">
          Discover major aviation hubs around the world.
        </p>



        <input

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Search airport or code..."

          className="mt-10 w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"

        />



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">


          {
            filteredAirports.map((airport)=>(


              <div

                key={airport.code}

                className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-sky-400 transition"

              >


                <div className="flex justify-between">


                  <h2 className="text-3xl font-bold text-sky-400">
                    {airport.code}
                  </h2>


                  <MapPin className="text-white"/>


                </div>



                <h3 className="text-xl font-semibold text-white mt-5">
                  {airport.name}
                </h3>



                <p className="text-gray-400 mt-3">
                  {airport.location}
                </p>



                <div className="flex items-center gap-2 text-gray-300 mt-5">

                  <Users size={18}/>

                  {airport.passengers}

                  <span>
                    passengers/year
                  </span>

                </div>



              </div>


            ))
          }


        </div>


      </div>


    </div>

  );

}