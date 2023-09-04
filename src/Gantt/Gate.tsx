// Row.tsx
import React from "react";
import { useDrop } from "react-dnd";
import Flight from "./Flight";

interface RowProps {
  gateDetails: any
  updateFlightSchedule: (toGate: string, draggedFlight: string) => void;
}

const Gate: React.FC<RowProps> = ({ gateDetails, updateFlightSchedule }) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "FLIGHT",
      drop: (item: any) => {
        
        updateFlightSchedule(gateDetails.Gate, item)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div style={{ width: "500px", height: "150px", border: "1px solid black"}}>
      <h2>Gate {gateDetails.Gate}</h2>
      <div
        className="ChildList"
        style={{
          width: "500px",
          height: "50px",
          border: "1px solid black",
          background: isOver ? "yellow" : "white",
          display:"flex", flexDirection: "row" 
        }}
        ref={drop}
      >
        {gateDetails.flights.map((flight:any, index:number) => <Flight key={`${gateDetails.Gate}.${index}`} name={flight} gate={gateDetails.Gate}/>)}
      </div>
    </div>
  );
};

export default Gate;


// function updateFlightSchedule(toGate: number, draggedFlight: any) {
//   // Create a copy of the flightSchedule array to avoid mutating the state directly
//   const updatedFlightSchedule = [...flightSchedule];

//   // Find the original gate and the target gate
//   const originalGate = updatedFlightSchedule[draggedFlight.gate];
//   const targetGate = updatedFlightSchedule[toGate];

//   // Remove the dragged flight from its original gate
//   const flightIndex = originalGate.flights.indexOf(draggedFlight.name);
//   if (flightIndex !== -1) {
//     originalGate.flights.splice(flightIndex, 1);

//     // If the original gate is now empty, remove it
//     if (originalGate.flights.length === 0) {
//       updatedFlightSchedule.splice(draggedFlight.gate, 1);
//     }
//   }

//   // Add the dragged flight to the target gate
//   targetGate.flights.push(draggedFlight.name);

//   // Update the state with the new flightSchedule
//   setFlightSchedule(updatedFlightSchedule);
// }
