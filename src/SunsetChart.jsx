import React, { useRef } from "react";
import Sketch from "react-p5";

export default function SunsetChart() {
  const myDiv = useRef();

  let sun_img;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(6400, 300).parent(canvasParentRef);
    sun_img = p5.loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Sun.png"
    );
  };

  const pixel = (p5, x, y, color) => {
    p5.noStroke();
    p5.fill(color);
    p5.rect(x - 1, y - 1, 2, 2);
  };

  const draw = (p5) => {
    p5.background(255);

    p5.fill("cyan");
    p5.beginShape();
    p5.curveVertex(0, 300 - 0);
    p5.curveVertex(0, 300 - 0);
    p5.curveVertex(0, 300 - 50);
    p5.curveVertex(0, 300 - 50);
    p5.curveVertex(400, 300 - 100);
    p5.curveVertex(800, 300 - 50);
    p5.curveVertex(1200, 300 - 100);
    p5.curveVertex(1600, 300 - 150);
    p5.curveVertex(2000, 300 - 120);
    p5.curveVertex(2400, 300 - 100);
    p5.curveVertex(2800, 300 - 120);
    p5.curveVertex(3200, 300 - 80);
    p5.curveVertex(3600, 300 - 160);
    p5.curveVertex(4000, 300 - 120);
    p5.curveVertex(4400, 300 - 70);
    p5.curveVertex(4800, 300 - 120);
    p5.curveVertex(5200, 300 - 50);
    p5.curveVertex(5600, 300 - 90);
    p5.curveVertex(6000, 300 - 120);
    p5.curveVertex(6400, 300 - 70);
    p5.curveVertex(6400, 300 - 70);
    p5.curveVertex(6400, 300 - 0);
    p5.curveVertex(6400, 300 - 0);
    p5.endShape();

    for (let i = 429; i < 6000; i++) {
      let x = (i * myDiv.current.offsetWidth) / 1000;
      let y = 300 + Math.sin((2 * Math.PI * i) / 2000) * 120;
      pixel(p5, x, y, "rgb(243,148,31)");
    }

    let x = myDiv.current.scrollLeft + myDiv.current.offsetWidth / 2;

    p5.image(
      sun_img,
      x - 15,
      300 +
        Math.sin(
          (2 * Math.PI * ((x / myDiv.current.offsetWidth) * 1000)) / 2000
        ) *
          120 -
        15,
      30,
      30,
      30,
      30
    );
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div
        ref={myDiv}
        onScroll={() => {
          console.log(myDiv.current.scrollLeft);
        }}
        style={{
          display: "block",
          position: "relative",
          maxWidth: "1000px",
          margin: "10px auto",
          overflow: "auto",
          outline: "1px solid black",
          marginTop: "1rem",
        }}
      >
        <Sketch setup={setup} draw={draw} />
        <div
          style={{
            backgroundColor: "#bbbfc3",
            display: "sticky",
            position: "sticky",
            left: 0,
            padding: ".3rem",
          }}
        >
          <div
            style={{
              width: "2px",
              backgroundImage: "linear-gradient(#fff, #bbbfc3)",
              position: "absolute",
              height: "200px",
              bottom: "0px",
              marginBottom: "30px",
              left: "calc(50% - 2px)",
            }}
          ></div>
          abc
        </div>
      </div>
    </div>
  );
}
