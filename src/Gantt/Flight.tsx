// Child.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

interface ChildProps {
  name: string;
  gate: number;
}

const Flight: React.FC<ChildProps> = ({ name, gate }) => {
  const [{isDragging}, drag] = useDrag(()=>({
    type: "FLIGHT",
    item: { type: 'FLIGHT', index: {name, gate} },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }));
 
  return (
    <div ref={drag} style={{width: "100px", height: "50px", border: "1px solid black", opacity: isDragging ? "0%" : "100%", cursor: 'move',}} >
      {name}
    </div>
  );
};

export default Flight;
