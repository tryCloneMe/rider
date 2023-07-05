import { useState } from "react";
import { objects } from "../objects";
import Cars from "./Cars";

const MapSVG = () => {
  const [cars, setCars] = useState([
    {
      id: "car1",
      next: [50, 50],
      rotation: 0,
    },
    {
      id: "car2",
      next: [260, 120],
      rotation: 270,
    },
  ]);
  const gridSize = 500;
  const gridCount = 31;

  const coordsToObjects = [];
  objects.forEach(([xStart, xEnd, yStart, yEnd, color]) => {
    let x = xStart;
    while (x <= xEnd) {
      let y = yStart;
      while (y <= yEnd) {
        coordsToObjects[`${x}:${y}`] = color || "lightgreen";
        y += 1;
      }
      x += 1;
    }
  });

  const squareSize = gridSize / gridCount;
  const Obstacle = ({ x, y, color }) => (
    <rect
      width={squareSize}
      height={squareSize}
      x={x}
      y={y}
      fill={color}
      stroke={color}
    />
  );

  const obstacleElems = [];
  for (let [key, color] of Object.entries(coordsToObjects)) {
    const [x, y] = key.split(":");
    obstacleElems.push(
      <Obstacle
        key={`${x}:${y}`}
        x={x * squareSize}
        y={y * squareSize}
        color={color}
      />
    );
  }

  return (
    <div style={{ border: "2px solid black", position: "relative" }}>
      <svg width={gridSize} height={gridSize}>
        {obstacleElems}
      </svg>
      {cars.map(({ id, next, rotation }) => {
        return <Cars key={id} next={next} rotation={rotation} />;
      })}
    </div>
  );
};

export default MapSVG;
