import { useState } from "react";


type Aircraft = {
  id:string;
  airline:string;
};



type Props = {
  aircraft:Aircraft[];
  onSelect:(id:string)=>void;
};



export default function MapControl({
  aircraft,
  onSelect,
}:Props){


  const [search,setSearch] = useState("");



  const filtered = aircraft.filter((plane)=>

    plane.id
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    plane.airline
      .toLowerCase()
      .includes(search.toLowerCase())

  );



  return (

    <div className="absolute top-6 left-6 z-1000 w-80 rounded-3xl bg-[#050B16]/90 backdrop-blur-xl border border-white/10 p-5">


      <h2 className="text-white text-xl font-bold">
        Active Aircraft
      </h2>


      <p className="text-gray-400 mt-1">
        {aircraft.length} aircraft online
      </p>



      <input

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        placeholder="Search flight..."

        className="mt-5 w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none"

      />



      <div className="mt-5 space-y-3">


        {
          filtered.map((plane)=>(


            <button

              key={plane.id}

              onClick={()=>onSelect(plane.id)}

              className="w-full text-left rounded-xl bg-white/5 hover:bg-sky-500/20 p-4 transition"

            >

              <p className="text-white font-semibold">
                {plane.id}
              </p>


              <p className="text-gray-400 text-sm">
                {plane.airline}
              </p>


            </button>


          ))
        }


      </div>


    </div>

  );

}