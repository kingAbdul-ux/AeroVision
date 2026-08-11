import { Plane, Building2, Users, Globe2 } from "lucide-react";

const stats = [
  {
    icon: Plane,
    value: "15,482+",
    label: "Daily Flights",
  },
  {
    icon: Building2,
    value: "980+",
    label: "Airports",
  },
  {
    icon: Users,
    value: "350+",
    label: "Airlines",
  },
  {
    icon: Globe2,
    value: "195",
    label: "Countries",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#07111F] py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center hover:border-sky-500 transition"
              >
                <Icon
                  className="mx-auto text-sky-400"
                  size={40}
                />

                <h2 className="mt-4 text-4xl font-bold text-white">
                  {item.value}
                </h2>

                <p className="mt-2 text-gray-400">
                  {item.label}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}