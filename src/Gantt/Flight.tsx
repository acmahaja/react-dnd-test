// Child.tsx
import React from "react";
import { useDrag } from "react-dnd";
import { FlightDetails } from "./Types";

interface ChildProps {
  flight: FlightDetails;
  gate: number;
}

const Flight: React.FC<ChildProps> = ({ flight, gate }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FLIGHT",
    item: { type: "FLIGHT", index: { flight, gate } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        width: `${flight.duration}px`,
        height: "50px",
        outline: "1px solid black",
        opacity: isDragging ? "50%" : "100%",
        cursor: "move",
        position: "absolute",
        left: flight.time
      }}
    >
      {flight.name}
    </div>
  );
};

export default Flight;
