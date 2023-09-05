import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Gate from "./Gantt/Gate";
import { useEffect, useState } from "react";
import { FlightDetails, FlightSchedule } from "./Gantt/Types";

function App() {
  const [flightSchedule, setFlightSchedule] = useState<FlightSchedule[]>([
    { Gate: "G1", flights: [{ name: "F1", time: 10, duration: 50 }] },
    {
      Gate: "G2",
      flights: [
        { name: "F2", time: 0, duration: 78 },
        { name: "F3", time: 300, duration: 45 },
      ],
    },
    {
      Gate: "G3",
      flights: [
        { name: "F4", time: 5, duration: 90 },
        { name: "F5", time: 125, duration: 67 },
        { name: "F6", time: 300, duration: 55 },
      ],
    },
  ]);

  function updateFlightSchedule(
    toGate: string,
    draggedFlight: any,
    newXTime: number
  ) {
    const updatedFlightSchedule = [...flightSchedule];

    const originalGate: string = draggedFlight.index.gate;
    const flightQuery: FlightDetails = draggedFlight.index.flight;
    

    const originalGateIndex: number = updatedFlightSchedule.findIndex(
      (gate) => gate.Gate === originalGate
    );      

    const targetGateIndex: number = updatedFlightSchedule.findIndex(
      (gate) => gate.Gate === toGate
    );
    if (targetGateIndex !== -1) {
      
      if (updatedFlightSchedule[originalGateIndex].flights.length === 1) {
        updatedFlightSchedule[originalGateIndex].flights = [];
      } else {
        updatedFlightSchedule[originalGateIndex].flights =
        updatedFlightSchedule[originalGateIndex].flights.filter(
          (currFlight: FlightDetails) => (currFlight !== flightQuery)
        );
      }
        flightQuery.time = newXTime;
        updatedFlightSchedule[targetGateIndex].flights.push(flightQuery);
        setFlightSchedule(updatedFlightSchedule);

      //   console.log(flightSchedule);
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {flightSchedule.map((gateDetails, index) => (
          <Gate
            key={gateDetails.Gate}
            gateDetails={gateDetails}
            updateFlightSchedule={updateFlightSchedule}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default App;
