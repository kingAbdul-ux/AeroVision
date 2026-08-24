import { useEffect, useState, type ReactNode } from "react";
import {
  Cloud,
  Sun,
  Wind,
  Eye,
  Gauge,
  Droplets,
} from "lucide-react";

import { getCurrentWeather } from "../api/weatherApi";

type WeatherData = {
  name?: string;

  main?: {
    temp?: number;
    feels_like?: number;
    humidity?: number;
    pressure?: number;
  };

  weather?: {
    main?: string;
    description?: string;
  }[];

  wind?: {
    speed?: number;
    deg?: number;
  };

  visibility?: number;

  clouds?: {
    all?: number;
  };
};

const DXB = {
  latitude: 25.2532,
  longitude: 55.3657,
};

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        setError("");

        const data = await getCurrentWeather(
          DXB.latitude,
          DXB.longitude
        );

        setWeather(data);
      } catch (err) {
        console.error("Weather error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load weather data."
        );
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  return (
    <main className="min-h-screen bg-[#07111F] px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <p className="text-lg text-sky-400">
          AeroVision
        </p>

        <h1 className="mt-2 text-5xl font-bold text-white">
          Aviation Weather
        </h1>

        <p className="mt-3 text-gray-400">
          Live weather conditions for Dubai International Airport.
        </p>

        {loading && (
          <p className="mt-10 text-sky-400">
            Loading weather...
          </p>
        )}

        {error && (
          <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
            <p className="text-red-400">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && weather && (
          <>
            <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div>
                  <p className="text-gray-400">
                    {weather.name || "Dubai"}
                  </p>

                  <h2 className="mt-2 text-5xl font-bold text-white">
                    {weather.main?.temp != null
                      ? `${Math.round(weather.main.temp)}°C`
                      : "N/A"}
                  </h2>

                  <p className="mt-3 capitalize text-gray-300">
                    {weather.weather?.[0]?.description ||
                      "Unknown conditions"}
                  </p>

                  <p className="mt-2 text-gray-500">
                    Feels like{" "}
                    {weather.main?.feels_like != null
                      ? `${Math.round(
                          weather.main.feels_like
                        )}°C`
                      : "N/A"}
                  </p>
                </div>

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-500/10">
                  {weather.weather?.[0]?.main === "Clear" ? (
                    <Sun
                      size={52}
                      className="text-yellow-400"
                    />
                  ) : (
                    <Cloud
                      size={52}
                      className="text-sky-400"
                    />
                  )}
                </div>

              </div>

            </section>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

              <WeatherCard
                title="Wind Speed"
                value={
                  weather.wind?.speed != null
                    ? `${weather.wind.speed} m/s`
                    : "N/A"
                }
                icon={<Wind size={24} />}
              />

              <WeatherCard
                title="Humidity"
                value={
                  weather.main?.humidity != null
                    ? `${weather.main.humidity}%`
                    : "N/A"
                }
                icon={<Droplets size={24} />}
              />

              <WeatherCard
                title="Pressure"
                value={
                  weather.main?.pressure != null
                    ? `${weather.main.pressure} hPa`
                    : "N/A"
                }
                icon={<Gauge size={24} />}
              />

              <WeatherCard
                title="Visibility"
                value={
                  weather.visibility != null
                    ? `${(weather.visibility / 1000).toFixed(1)} km`
                    : "N/A"
                }
                icon={<Eye size={24} />}
              />

            </div>

            <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">

              <h2 className="text-2xl font-bold text-white">
                Airport Conditions
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

                <InfoRow
                  label="Weather"
                  value={
                    weather.weather?.[0]?.main ||
                    "N/A"
                  }
                />

                <InfoRow
                  label="Wind Direction"
                  value={
                    weather.wind?.deg != null
                      ? `${weather.wind.deg}°`
                      : "N/A"
                  }
                />

                <InfoRow
                  label="Cloud Cover"
                  value={
                    weather.clouds?.all != null
                      ? `${weather.clouds.all}%`
                      : "N/A"
                  }
                />

              </div>

            </section>
          </>
        )}

      </div>
    </main>
  );
}

function WeatherCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      <div className="text-sky-400">
        {icon}
      </div>

      <p className="mt-4 text-gray-400">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-black/20 p-5">

      <p className="text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-white">
        {value}
      </p>

    </div>
  );
}