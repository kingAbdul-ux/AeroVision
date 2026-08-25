import axios from "axios";

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const BASE_URL = "https://aerodatabox.p.rapidapi.com";

const headers = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
};

export async function getAirportByIata(iata: string) {
  if (!API_KEY) {
    throw new Error("VITE_RAPIDAPI_KEY is missing.");
  }

  const response = await axios.get(
    `${BASE_URL}/airports/iata/${iata}`,
    {
      headers,
      params: {
        withTime: "true",
        withRunways: "true",
      },
    }
  );

  return response.data;
}

export async function searchAirports(term: string) {
  if (!API_KEY) {
    throw new Error("VITE_RAPIDAPI_KEY is missing.");
  }

  const response = await axios.get(
    `${BASE_URL}/airports/search/term`,
    {
      headers,
      params: {
        q: term,
        limit: 10,
      },
    }
  );

  return response.data;
}