import { getAircraftStates } from "../api/openSkyApi";

import type { Aircraft } from "../types/flight";

type OpenSkyState = [string | null, string | null, string | null, ...unknown[]];

export async function fetchAircraft(): Promise<Aircraft[]> {
  const data = await getAircraftStates();

  const aircraft: Aircraft[] = (data.states ?? [])
    .map((plane: OpenSkyState) => {
      const longitude = plane[5];
      const latitude = plane[6];
      const altitude = plane[7];
      const velocity = plane[9];
      const heading = plane[10];

      return {
        icao24: plane[0] ?? null,
        callsign: typeof plane[1] === "string" ? plane[1].trim() || null : null,
        country: plane[2] ?? null,
        longitude: typeof longitude === "number" ? longitude : null,
        latitude: typeof latitude === "number" ? latitude : null,
        altitude: typeof altitude === "number" ? altitude : null,
        velocity: typeof velocity === "number" ? velocity : null,
        heading: typeof heading === "number" ? heading : null,
      };
    })
    .filter(
      (plane: Aircraft) =>
        plane.latitude !== null &&
        plane.longitude !== null
    );

  return aircraft;
}