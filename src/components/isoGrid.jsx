import React from "react";

const IsoGrid = ({ rows = 10, cols = 30, size = 70 }) => {
  const h = (Math.sqrt(3) / 2) * size;

  const svgWidth = (size * (cols + 1)) / 2;
  const svgHeight = rows * h/2;

  const list = [];
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = col * h;
      const y = row * size/2;
      const isUp = (row + col) % 2 === 0;

      const pts = isUp
        ? [
            [x, y + size/2],//A
            [x + h , y],//B
            [x + h, y + size],//C
          ]
        : [
            [x, y],
            [x + h, y+size/2],
            [x, y + size],
          ];

      const pointsStr = pts.map(([px, py]) => `${px},${py}`).join(" ");
      list.push(pointsStr);
    }
  }

  // const { box, handleEnter, handleLeave } = useHoverBox();i
  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      style={{ display: "block", background: "#071026" }}
    >
      {list.map((points, i) => (
        <polygon
          key={i}
          points={points}
          className="transition-colors duration-200"
          style={{
            
            stroke: "rgba(255,255,255,0.1)",
            strokeWidth: 0.6,
            
          }}
          transform={`translate(0,${-h / 2})`}  
        />
      ))}
    </svg>
  );
};

export default IsoGrid;
