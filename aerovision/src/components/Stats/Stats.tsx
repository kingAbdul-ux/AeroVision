import {
  Plane,
  Building2,
  Users,
  Globe2,
} from "lucide-react";

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
    <section className="bg-[#07111F] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl transition duration-300 hover:border-sky-500/50 hover:bg-white/10 sm:rounded-3xl sm:p-6 lg:p-8"
              >

                <div className="flex justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Icon
                      className="text-sky-400"
                      size={24}
                    />
                  </div>
                </div>

                <h2 className="mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-3xl lg:text-4xl">
                  {item.value}
                </h2>

                <p className="mt-1 text-xs text-gray-400 sm:mt-2 sm:text-sm lg:text-base">
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