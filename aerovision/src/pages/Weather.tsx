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
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

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

    void loadWeather();
  }, []);

  return (
    <main className="min-h-screen bg-[#07111F] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <p className="text-base text-sky-400 sm:text-lg">
          AeroVision
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
          Aviation Weather
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-gray-400 sm:text-base">
          Live weather conditions for Dubai International Airport.
        </p>


        {/* Loading */}

        {loading && (
          <div className="mt-8 rounded-2xl border border-sky-400/10 bg-sky-500/5 p-5">
            <p className="text-sm text-sky-400 sm:text-base">
              Loading weather...
            </p>
          </div>
        )}


        {/* Error */}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 sm:p-6">
            <p className="text-sm font-medium text-red-300">
              Weather Service
            </p>

            <p className="mt-1 wrap-break-word text-sm text-red-400 sm:text-base">
              {error}
            </p>
          </div>
        )}


        {/* Weather */}

        {!loading &&
          !error &&
          weather && (
            <>
              {/* Main weather card */}

              <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:mt-12 sm:p-8">

                <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-center md:justify-between">

                  <div className="min-w-0">

                    <p className="text-sm text-gray-400 sm:text-base">
                      {weather.name || "Dubai"}
                    </p>

                    <h2 className="mt-2 text-5xl font-bold text-white sm:text-6xl">
                      {weather.main?.temp != null
                        ? `${Math.round(
                            weather.main.temp
                          )}°C`
                        : "N/A"}
                    </h2>

                    <p className="mt-3 capitalize text-sm text-gray-300 sm:text-base">
                      {weather.weather?.[0]
                        ?.description ||
                        "Unknown conditions"}
                    </p>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                      Feels like{" "}
                      {weather.main?.feels_like !=
                      null
                        ? `${Math.round(
                            weather.main.feels_like
                          )}°C`
                        : "N/A"}
                    </p>

                  </div>


                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-sky-500/10 sm:h-24 sm:w-24">

                    {weather.weather?.[0]
                      ?.main === "Clear" ? (
                      <Sun
                        size={44}
                        className="text-yellow-400 sm:size-13"
                      />
                    ) : (
                      <Cloud
                        size={44}
                        className="text-sky-400 sm:size-13"
                      />
                    )}

                  </div>

                </div>

              </section>


              {/* Weather statistics */}

              <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">

                <WeatherCard
                  title="Wind Speed"
                  value={
                    weather.wind?.speed != null
                      ? `${weather.wind.speed} m/s`
                      : "N/A"
                  }
                  icon={<Wind size={23} />}
                />

                <WeatherCard
                  title="Humidity"
                  value={
                    weather.main?.humidity != null
                      ? `${weather.main.humidity}%`
                      : "N/A"
                  }
                  icon={<Droplets size={23} />}
                />

                <WeatherCard
                  title="Pressure"
                  value={
                    weather.main?.pressure != null
                      ? `${weather.main.pressure} hPa`
                      : "N/A"
                  }
                  icon={<Gauge size={23} />}
                />

                <WeatherCard
                  title="Visibility"
                  value={
                    weather.visibility != null
                      ? `${(
                          weather.visibility / 1000
                        ).toFixed(1)} km`
                      : "N/A"
                  }
                  icon={<Eye size={23} />}
                />

              </div>


              {/* Airport conditions */}

              <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:mt-8 sm:p-8">

                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  Airport Conditions
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 md:grid-cols-3 sm:gap-5">

                  <InfoRow
                    label="Weather"
                    value={
                      weather.weather?.[0]
                        ?.main || "N/A"
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">

      <div className="text-sky-400">
        {icon}
      </div>

      <p className="mt-4 text-sm text-gray-400 sm:text-base">
        {title}
      </p>

      <p className="mt-2 wrap-break-word text-xl font-bold text-white sm:text-2xl">
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

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 wrap-break-word text-sm text-white sm:text-base">
        {value}
      </p>

    </div>
  );
}