import {
  getAircraftStates
} from "../api/openSkyApi";


import type {
  Aircraft
} from "../types/flight";



export async function fetchAircraft()
: Promise<Aircraft[]> {


  const data =
    await getAircraftStates();



  const aircraft =
    data.states
      ?.map((plane: [
        string,
        string | null,
        string,
        unknown,
        unknown,
        number | null,
        number | null,
        number | null,
        unknown,
        number | null,
        number | null,
      ]) => ({

        icao24: plane[0],

        callsign:
          plane[1]?.trim()
          || null,

        country:
          plane[2],

        longitude:
          plane[5],

        latitude:
          plane[6],

        altitude:
          plane[7],

        velocity:
          plane[9],

        heading:
          plane[10],

      }))
      .filter(
        (plane:Aircraft)=>
          plane.latitude &&
          plane.longitude
      );



  return aircraft || [];

}