import { useEffect, useState } from "react";
import {
  Plane,
  Globe2,
  Radio,
  Activity,
} from "lucide-react";

import { fetchAircraft } from "../../services/flightservice";

type StatsData = {
  aircraft: number;
  countries: number;
};

export default function Stats() {
  const [stats, setStats] = useState<StatsData>({
    aircraft: 0,
    countries: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        setLoading(true);
        setError("");

        const aircraftData = await fetchAircraft();

        if (cancelled) {
          return;
        }

        const countries = new Set(
          aircraftData
            .map((aircraft) => aircraft.country)
            .filter(Boolean)
        );

        setStats({
          aircraft: aircraftData.length,
          countries: countries.size,
        });
      } catch (err) {
        console.error("Home statistics error:", err);

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load live statistics."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = [
    {
      icon: Plane,
      value: loading
        ? "..."
        : stats.aircraft.toLocaleString(),
      label: "Live Aircraft",
    },
    {
      icon: Globe2,
      value: loading
        ? "..."
        : stats.countries.toLocaleString(),
      label: "Countries Tracked",
    },
    {
      icon: Radio,
      value: "Live",
      label: "Aircraft Tracking",
    },
    {
      icon: Activity,
      value: "Online",
      label: "AeroVision Status",
    },
  ];

  return (
    <section className="bg-[#08121b] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">

        {error && (
          <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
            <p className="text-sm text-yellow-300">
              Live aircraft statistics unavailable: {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className="aviation-panel relative overflow-hidden p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-[#f5b942]/60 sm:p-6 lg:p-8"
              >
                <div className="flex justify-between">
                  <div className="flex h-11 w-11 items-center justify-center border border-[#f5b942]/30 bg-[#f5b942]/10 sm:h-14 sm:w-14">
                    <Icon
                      className="text-[#f5b942]"
                      size={24}
                    />
                  </div>
                </div>

                <h2 className="mono-data mt-5 text-2xl font-medium text-white sm:mt-6 sm:text-3xl lg:text-4xl">
                  {card.value}
                </h2>

                <p className="eyebrow mt-2 text-[#91aab5]">
                  {card.label}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}