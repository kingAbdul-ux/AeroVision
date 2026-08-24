import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(
  latitude: number,
  longitude: number
) {
  if (!API_KEY) {
    throw new Error(
      "VITE_OPENWEATHER_API_KEY is missing."
    );
  }

  const response = await axios.get(
    `${BASE_URL}/weather`,
    {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: "metric",
      },
    }
  );

  if (response.data?.cod && response.data.cod !== 200) {
    throw new Error(
      response.data.message ||
        "OpenWeather request failed."
    );
  }

  return response.data;
}