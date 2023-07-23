import { useEffect, useState } from "react";
import carImg from "../assets/car.png";
import {
  getNextCoordIndex,
  advanceCoord,
  countTurns,
  finalRotation,
  getTurnDistance,
} from "../utils/movement";
import { wait } from "../utils/wait";
import { fetchInterval, refreshInterval } from "../utils/test";

// const Cars = ({ next, rotation, path }) => {
const Cars = (props) => {
  const [position, setPosition] = useState(props.next);
  const [rotation, setRotation] = useState(finalRotation(props.path, 1));
  const [rotateBusy, setRotateBusy] = useState(false);

  useEffect(() => {
    setPosition(props.next);
    setRotation(finalRotation(props.path, 1));
  }, [props]);

  const rotate = async (section, i) => {
    setRotateBusy(true);

    let myRotation = rotation;
    const targetRotation = finalRotation(section, i);
    if (rotation === targetRotation) {
      return setRotateBusy(false);
    }

    const { Clockwise, AntiClockwise } = getTurnDistance(
      myRotation,
      targetRotation
    );
    const isClockwise = Clockwise < AntiClockwise;

    const diff = Math.min(Clockwise, AntiClockwise);
    const steps =
      (refreshInterval * 8) /
      refreshInterval; /*(turnDuration = refreshInterval * 8)*/
    const increment = diff / steps;

    while (rotation !== targetRotation) {
      if (isClockwise) myRotation += increment;
      else myRotation -= increment;

      if (myRotation > 360) myRotation = 0;
      else if (myRotation < 0) myRotation = 360 - Math.abs(myRotation);

      setRotation(myRotation);
      await wait(refreshInterval);
    }

    setRotateBusy(false);
  };

  const move = async (next) => {
    let [currX, currY] = position;

    const startIndex = getNextCoordIndex(currX, currY, props.path);
    const endIndex = props.path.findIndex(([x, y]) => {
      return x === next[0] && y === next[1];
    });

    const section = props.path.slice(startIndex, endIndex + 1);
    const myCountTurns = countTurns(section);
    const myTurnDuration =
      myCountTurns *
      refreshInterval *
      8; /*(turnDuration = refreshInterval * 8)*/

    const distance = endIndex - startIndex + Math.max(currX % 1, currY % 1);
    const steps = (fetchInterval - myTurnDuration) / refreshInterval;
    const increment = distance / steps;

    for (let i = 0; i < section.length; i++) {
      if (i > 0) {
        while (rotateBusy) {
          await wait(refreshInterval);
        }
        await rotate(section, i);
      }
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
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <img src={carImg} style={{ width: "100%", height: "50%" }} />
    </div>
  );
};

export default Cars;
