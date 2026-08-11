import { useEffect, useState } from "react";

import {
  fetchAircraft
} from "../services/flightservice";

interface Aircraft {
  icao24: string;
  callsign: string | null;
  country: string;
}

export default function TestFlights(){

  const [planes,setPlanes] =
    useState<Aircraft[]>([]);



  useEffect(()=>{


    fetchAircraft()
      .then(data=>{

        console.log(data);

        setPlanes(
          data.slice(0,10)
        );

      });


  },[]);



  return (

    <div className="min-h-screen bg-[#07111F] p-10">

      <h1 className="text-4xl text-white">
        OpenSky Test
      </h1>


      {
        planes.map((plane)=>(
          
          <div
            key={plane.icao24}
            className="text-white mt-4"
          >

            {plane.callsign}
            -
            {plane.country}

          </div>

        ))
      }


    </div>

  );

}