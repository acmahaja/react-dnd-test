export type FlightDetails = {
  name: string;
  time: number;
  duration: number;
};

export type FlightSchedule = {
  Gate: string;
  flights: FlightDetails[];
};
