import { useState } from "react";
import FlightCard from "../FlightCard/FlightCard";
import AirportSearch from "../AirportSearch/AirportSearch";


const flights = [
  {
    flightNumber: "EK202",
    airline: "Emirates",
    from: "DXB",
    to: "JFK",
    time: "09:30 AM",
    status: "On Time",
  },

  {
    flightNumber: "BA117",
    airline: "British Airways",
    from: "LHR",
    to: "JFK",
    time: "11:45 AM",
    status: "Boarding",
  },

  {
    flightNumber: "SQ12",
    airline: "Singapore Airlines",
    from: "SIN",
    to: "HND",
    time: "02:15 PM",
    status: "Delayed",
  },
];


export default function SearchBar() {

  const [from, setFrom] = useState("");

  const [to, setTo] = useState("");

  const [results, setResults] = useState<typeof flights>([]);



  function searchFlights() {

    const filtered = flights.filter((flight) =>
      flight.from === from &&
      flight.to === to
    );


    setResults(filtered);

  }



  return (

    <div className="aviation-panel mt-12 w-full max-w-6xl p-6">


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


        <AirportSearch

          placeholder="Departure Airport"

          onSelect={setFrom}

        />


        <AirportSearch

          placeholder="Arrival Airport"

          onSelect={setTo}

        />



        <button

          onClick={searchFlights}

          className="border border-[#f5b942] bg-[#f5b942] text-sm font-bold uppercase tracking-[0.1em] text-[#08121b] transition hover:bg-[#ffd16b]"

        >

          Search Flight

        </button>


      </div>



      {
        results.length > 0 && (

          <div className="mt-8 grid gap-5">

            {
              results.map((flight)=>(
                <FlightCard

                  key={flight.flightNumber}

                  {...flight}

                />
              ))
            }

          </div>

        )
      }



      {
        results.length === 0 && (

          <p className="mt-6 text-gray-400 text-center">

            Select airports and search for flights.

          </p>

        )
      }


    </div>

  );
}