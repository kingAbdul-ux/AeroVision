import axios from "axios";

const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;
const BASE_URL = "https://api.aviationstack.com/v1";

export async function getLiveFlights() {
  if (!API_KEY) {
    throw new Error("VITE_AVIATIONSTACK_API_KEY is missing.");
  }

  const response = await axios.get(`${BASE_URL}/flights`, {
    params: {
      access_key: API_KEY,
      limit: 20,
    },
  });

  if (response.data?.error) {
    throw new Error(
      response.data.error.message || "AviationStack request failed."
    );
  }

  return response.data;
}


export async function getFlightByNumber(flightNumber: string) {
  if (!API_KEY) {
    throw new Error("VITE_AVIATIONSTACK_API_KEY is missing.");
  }

  const response = await axios.get(`${BASE_URL}/flights`, {
    params: {
      access_key: API_KEY,
      flight_number: flightNumber,
      limit: 1,
    },
  });

  if (response.data?.error) {
    throw new Error(
      response.data.error.message || "AviationStack request failed."
    );
  }

  return response.data;
}