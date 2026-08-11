import { useState } from "react";
import { airports } from "../../data/airports";


type AirportSearchProps = {
  placeholder: string;
  onSelect: (code:string)=>void;
};


export default function AirportSearch({
  placeholder,
  onSelect,
}: AirportSearchProps) {


  const [value,setValue] = useState("");

  const [open,setOpen] = useState(false);



  const filtered = airports.filter((airport)=>

    airport.code
      .toLowerCase()
      .includes(value.toLowerCase())

    ||

    airport.name
      .toLowerCase()
      .includes(value.toLowerCase())

  );



  return (

    <div className="relative">


      <input

        value={value}

        onChange={(e)=>{

          setValue(e.target.value);

          setOpen(true);

        }}

        placeholder={placeholder}

        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none"

      />



      {
        open && value && (

          <div className="absolute z-20 mt-2 w-full rounded-xl bg-[#111827] border border-white/10 overflow-hidden">


            {
              filtered.map((airport)=>(

                <button

                  key={airport.code}

                  onClick={()=>{

                    setValue(airport.code);

                    setOpen(false);

                    onSelect(airport.code);

                  }}

                  className="w-full text-left px-4 py-3 hover:bg-white/10 text-white"

                >

                  <strong>
                    {airport.code}
                  </strong>

                  {" - "}

                  {airport.name}

                </button>

              ))

            }


          </div>

        )

      }


    </div>

  );
}