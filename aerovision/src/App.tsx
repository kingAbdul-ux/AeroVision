import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar/navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Flights from "./pages/Flights";
import FlightDetails from "./pages/FlightDetails";
import Airports from "./pages/Airports";
import LiveMap from "./pages/LiveMap";
import Weather from "./pages/Weather";


export default function App() {

  return (

    <BrowserRouter>

      {/* Navbar appears on every page */}
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/flights"
          element={<Flights />}
        />

        <Route
          path="/flight/:id"
          element={<FlightDetails />}
        />

        <Route
          path="/airports"
          element={<Airports />}
        />

        <Route
          path="/map"
          element={<LiveMap />}
        />

        <Route
          path="/weather"
          element={<Weather />}
        />

      </Routes>

    </BrowserRouter>

  );
}