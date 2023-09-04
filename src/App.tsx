import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Gate from "./Gantt/Gate";
import { useEffect, useState } from "react";

type FlightScheduleItem = {
  Gate: string;
  flights: string[];
};

function App() {
  const [flightSchedule, setFlightSchedule] = useState<FlightScheduleItem[]>([
    { Gate: "G1", flights: ["F1"] },
    { Gate: "G2", flights: ["F2", "F3"] },
    { Gate: "G3", flights: ["F4", "F5", "F6"] },
  ]);

  function updateFlightSchedule(toGate: string, draggedFlight: any) {
    const updatedFlightSchedule = [...flightSchedule];

    const originalGate: string = draggedFlight.index.gate;
    const flightName: string = draggedFlight.index.name;

    const originalGateIndex: number = updatedFlightSchedule.findIndex(
      (gate) => gate.Gate === originalGate
    );

    const targetGateIndex: number = updatedFlightSchedule.findIndex(
      (gate) => gate.Gate === toGate
    );

    if (targetGateIndex !== -1 && targetGateIndex !== originalGateIndex) {
      
      if (updatedFlightSchedule[originalGateIndex].flights.length === 1) {
        updatedFlightSchedule[originalGateIndex].flights = []
      } else {
        updatedFlightSchedule[originalGateIndex].flights = updatedFlightSchedule[
          originalGateIndex
        ].flights.filter((currFlight) => currFlight !== flightName);
      }

      updatedFlightSchedule[targetGateIndex].flights.push(flightName);

      setFlightSchedule(updatedFlightSchedule);

      console.log(flightSchedule);

    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {flightSchedule.map((gateDetails, index) => (
          <Gate
            key={index}
            gateDetails={gateDetails}
            updateFlightSchedule={updateFlightSchedule}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default App;
