import PageNavigation from "../components/PageNavigation/PageNavigation";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#07111F]">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <p className="text-sky-400 text-lg">
          AeroVision
        </p>

        <h1 className="text-5xl font-bold text-white mt-3">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Your central aviation command center.
        </p>

      </div>


      <PageNavigation />

    </main>
  );
}