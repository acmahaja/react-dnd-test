// Row.tsx
import React, { useRef } from "react";
import { ConnectableElement, useDrop } from "react-dnd";
import Flight from "./Flight";
import { FlightDetails } from "./Types";

interface RowProps {
  gateDetails: any;
  updateFlightSchedule: (
    toGate: string,
    draggedFlight: any,
    newXTime: number
  ) => void;
}

const Gate: React.FC<RowProps> = ({ gateDetails, updateFlightSchedule }) => {
  const ref: any = useRef(null);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "FLIGHT",
      drop: (index: any, monitor: any) => {
        const offset = monitor.getSourceClientOffset();
        const deltaX = offset.x - ref.current.x;        
        if (
          deltaX < ref.current.width &&
          deltaX >= 0 &&
          (index.index.flight.duration + deltaX) <= ref.current.width
        ) {
          updateFlightSchedule(gateDetails.Gate, index, deltaX);
        } else {
          console.log("Bad Flight");
          
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  function combinedRef(el: any) {
    drop(el);
    if (el) {
      ref.current = el.getBoundingClientRect();
    }
  }

  return (
    <div
      style={{ width: "500px", height: "150px", outline: "1px solid black" }}
    >
      <h2>Gate {gateDetails.Gate}</h2>
      <div
        className="ChildList"
        style={{
          width: "500px",
          height: "50px",
          outline: "1px solid black",
          background: isOver ? "yellow" : "white",
          position: "relative",
        }}
        ref={combinedRef}
      >
        {gateDetails.flights.map((flight: FlightDetails) => (
          <Flight
            key={`${gateDetails.Gate}.${flight.name}`}
            flight={flight}
            gate={gateDetails.Gate}
          />
        ))}
      </div>
    </div>
  );
};

export default Gate;
