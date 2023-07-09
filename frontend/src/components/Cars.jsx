import { useEffect, useState } from "react";
import carImg from "../assets/car.png";
import { getNextCoordIndex, advanceCoord } from "../utils/movement";
import { wait } from "../utils/wait";
import { fetchInterval, refreshInterval } from "../utils/test";

// const Cars = ({ next, rotation, path }) => {
const Cars = (props) => {
  const [position, setPosition] = useState(props.next);

  const move = async (next) => {
    let [currX, currY] = position;

    const startIndex = getNextCoordIndex(currX, currY, props.path);
    const endIndex = props.path.findIndex(([x, y]) => {
      return x === next[0] && y === next[1];
    });

    const section = props.path.slice(startIndex, endIndex + 1);

    const distance = endIndex - startIndex + Math.max(currX % 1, currY % 1);
    const steps = fetchInterval / refreshInterval;
    const increment = distance / steps;

    for (let i = 0; i < section.length; i++) {
      const [nextX, nextY] = section[i];

      while (currX !== nextX) {
        if (next !== props.next) return;

        currX = advanceCoord(currX, nextX, increment);
        setPosition((prev) => [currX, prev[1]]);
        await wait(refreshInterval);
      }

      while (currY !== nextY) {
        if (next !== props.next) return;

        currY = advanceCoord(currY, nextY, increment);
        setPosition((prev) => [prev[0], currY]);
        await wait(refreshInterval);
      }
    }
  };

  useEffect(() => {
    if (props.next !== position) {
      move(props.next);
    }
  }, [props.next]);

  const [x, y] = position;

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        position: "absolute",
        top: `${x}px`,
        left: `${y}px`,
        transform: `rotate(${props.rotation}deg)`,
      }}
    >
      <img src={carImg} style={{ width: "100%", height: "50%" }} />
    </div>
  );
};

export default Cars;
