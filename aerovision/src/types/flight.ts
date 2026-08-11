export interface Aircraft {

  icao24: string;

  callsign: string | null;

  country: string;

  longitude: number;

  latitude: number;

  altitude: number | null;

  velocity: number | null;

  heading: number | null;

}