import apiClient from "./apiClient";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(
  latitude: number,
  longitude: number
) {

  const response = await apiClient.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat: latitude,
        lon: longitude,
        units: "metric",
        appid: API_KEY,
      },
    }
  );

  return response.data;

}