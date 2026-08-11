import apiClient from "./apiClient";

const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;

const BASE_URL = "https://api.aviationstack.com/v1";

export async function getFlights() {
  const response = await apiClient.get(
    `${BASE_URL}/flights`,
    {
      params: {
        access_key: API_KEY,
      },
    }
  );

  return response.data;
}