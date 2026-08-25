import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";
import AircraftSection from "../components/AircraftSection/AircraftSection";
import FlightMap from "../components/FlightMap/FlightMap";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <main className="bg-[#07111F]">
        <Hero />
        <Stats />
        <AircraftSection />
        <FlightMap />
      </main>

      <Footer />
    </>
  );
}