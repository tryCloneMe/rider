import { useState } from "react";
import carImg from "../assets/car.png";

const Cars = ({ next, rotation }) => {
    const [nextPosition, setNextPosition] = useState(next);
    const [rotate, setRotate] = useState(rotation);

    const [x, y] = nextPosition;
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        position: "absolute",
        top: `${x}px`,
        left: `${y}px`,
        transform: `rotate(${rotate}deg)`
      }}
    >
      <img src={carImg} style={{ width: "100%", height: "50%" }} />
    </div>
  );
};

export default Cars;
