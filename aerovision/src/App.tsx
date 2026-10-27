import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  lazy,
  Suspense,
} from "react";

import Navbar from "./components/NavBar/navbar";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Flights = lazy(() => import("./pages/Flights"));
const FlightDetails = lazy(
  () => import("./pages/FlightDetails")
);
const Airports = lazy(() => import("./pages/Airports"));
const LiveMap = lazy(() => import("./pages/LiveMap"));
const Weather = lazy(() => import("./pages/Weather"));

function PageLoader() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />

        <p className="mt-4 text-sm text-slate-500">
          Loading AeroVision...
        </p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </BrowserRouter>
  );
}
