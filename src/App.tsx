import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Gate from "./Gantt/Gate";
import { useEffect, useState } from "react";
import { FlightDetails, FlightSchedule } from "./Gantt/Types";



function doFlightsOverlap(flight1: FlightDetails, flight2: FlightDetails): boolean {
  const endTimeFlight1 = flight1.time + flight1.duration;
  const endTimeFlight2 = flight2.time + flight2.duration;

  const overlapCondition =
    (flight1.time <= flight2.time && endTimeFlight1 >= flight2.time) ||
    (flight2.time <= flight1.time && endTimeFlight2 >= flight1.time);



  return overlapCondition;

}


const findIndexToAddFlight = (
  flights: FlightDetails[][],
  newFlight: FlightDetails
) :number=> {
  let earliestRow: number = -1;
  for (let rowIndex = 0; (rowIndex < flights.length); rowIndex++) {
    const currRow: FlightDetails[] = flights[rowIndex];
    let foundRow: boolean = false;
    for (let flightIndex = 0; (flightIndex < currRow.length && !foundRow); flightIndex++) {
      
      if(doFlightsOverlap(newFlight, currRow[flightIndex])){
        foundRow = true;
        break;
      }
    } 

    if (!foundRow) {
        earliestRow = rowIndex;
        foundRow = true;
        break;
    }
  }
  
  return earliestRow;
};


function App() {
  const [flightSchedule, setFlightSchedule] = useState<FlightSchedule[]>([
    { Gate: "G1", flights: [[{ name: "F1", time: 10, duration: 50 }]] },
    {
      Gate: "G2",
      flights: [
        [
          { name: "F2", time: 0, duration: 78 },
          { name: "F3", time: 300, duration: 45 },
        ], [{ name: "F7", time: 300, duration: 45 },]
      ],
    },
    {
      Gate: "G3",
      flights: [
        [
          { name: "F4", time: 5, duration: 90 },
          { name: "F5", time: 125, duration: 67 },
          { name: "F6", time: 300, duration: 55 },
        ],
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
      for (
        let row = 0;
        row < updatedFlightSchedule[originalGateIndex].flights.length;
        row++
      ) {
        updatedFlightSchedule[originalGateIndex].flights[row] =
          updatedFlightSchedule[originalGateIndex].flights[row].filter((currFlight: FlightDetails) => currFlight !== flightQuery);
          updatedFlightSchedule[originalGateIndex].flights = updatedFlightSchedule[originalGateIndex].flights.filter((row) => row.length !== 0) 
      }
      flightQuery.time = newXTime;
      const indexToAddFlight:number = findIndexToAddFlight(updatedFlightSchedule[targetGateIndex].flights, flightQuery);      
      if (indexToAddFlight === -1) {
        updatedFlightSchedule[targetGateIndex].flights.push([])  
        updatedFlightSchedule[targetGateIndex].flights[updatedFlightSchedule[targetGateIndex].flights.length-1].push(flightQuery);
      } else {        
        updatedFlightSchedule[targetGateIndex].flights[indexToAddFlight].push(flightQuery);
      }
      
      setFlightSchedule(updatedFlightSchedule);
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
