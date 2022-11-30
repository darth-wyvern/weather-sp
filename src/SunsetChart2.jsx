import React, { useRef } from "react";
import Sketch from "react-p5";

export default function SunsetChart2() {
  const canvas = useRef();
  const myDiv = useRef();

  const pixel = (p5, x, y) => {
    p5.rect(x, y, 1, 1);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(2880, 280).parent(canvasParentRef);
    p5.noStroke();
    p5.fill("black");

    const res = canvasParentRef.offsetWidth / 2880;

    for (let i = 0; i < 2880; i++) {
      let y = 240 + Math.sin((i * Math.PI) / (2880 / 7)) * 100;
    }

    console.log(canvas.current.sketch);
  };

  const draw = (p5) => {};

  return (
    <div
      ref={myDiv}
      style={{
        display: "block",
        position: "relative",
        maxWidth: "1000px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Sketch
        setup={setup}
        draw={draw}
        className="p5"
        ref={canvas}
        style={{
          width: "100%",
          maxWidth: "1000px",
          overflowX: "auto",
          margin: "auto",
        }}
      />
    </div>
  );
}
