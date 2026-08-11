import axios from "axios";


const OPENSKY_URL =
  "https://opensky-network.org/api/states/all";


export async function getAircraftStates() {

  const response = await axios.get(
    OPENSKY_URL
  );


  return response.data;

}