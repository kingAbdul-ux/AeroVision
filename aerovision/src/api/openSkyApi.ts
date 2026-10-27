import axios from "axios";

const API_URL =
  "http://192.168.100.152:4000/api/opensky/states";

export async function getAircraftStates() {
  const response = await axios.get(API_URL);

  return response.data;
}