import apiClient from "./apiClient";

const API_KEY = import.meta.env.VITE_AERODATABOX_API_KEY;

export async function getAirport(icao: string) {

  const response = await apiClient.get(

    `https://aerodatabox.p.rapidapi.com/airports/icao/${icao}`,

    {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
      },
    }

  );

  return response.data;

}