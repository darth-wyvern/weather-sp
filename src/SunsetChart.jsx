import React, { useRef } from "react";
import Sketch from "react-p5";

function SunsetChart() {
  const myDiv = useRef();
  const chart = [
    { time: 0, value: 50 },
    { time: 400, value: 15 },
    { time: 800, value: 80 },
    { time: 1200, value: 30 },
    { time: 1600, value: 150 },
    { time: 2000, value: 120 },
    { time: 2400, value: 100 },
    { time: 2800, value: 120 },
    { time: 3200, value: 80 },
    { time: 3600, value: 160 },
    { time: 4000, value: 120 },
    { time: 4400, value: 70 },
    { time: 4800, value: 120 },
    { time: 5200, value: 50 },
    { time: 5600, value: 90 },
    { time: 6000, value: 120 },
  ];

  var chartResponsive = [];

  const setup = (p5, canvasParentRef) => {
    var _width = canvasParentRef.offsetWidth;
    p5.createCanvas(_width * 6, 280).parent(canvasParentRef);
    for (let i = 0; i < chart.length; i++) {
      let t = (chart[i].time * myDiv.current.offsetWidth) / 1000;
      chartResponsive.push({ time: t, value: chart[i].value });
    }
  };

  const pixel = (p5, x, y, color) => {
    p5.noStroke();
    p5.fill(color);
    p5.rect(x, y, 1, 1);
  };

  const leftPad = (number, targetLength) => {
    var output = number + "";
    while (output.length < targetLength) {
      output = "0" + output;
    }
    return output;
  };

  const draw = (p5) => {
    p5.background(255);
    let hour = 0;
    let minute = 0;
    let responseChart = myDiv.current.offsetWidth / 1000;
    let start = (425 - 15) * responseChart;
    let h = 140;
    let w = 6400;
    let sessionDay = "am";
    let range = myDiv.current.offsetWidth;
    let cur = myDiv.current.scrollLeft + range / 2;
    let s = p5.PI / range;
    let sunX = cur;
    let sunY = 240 + p5.sin((start + cur) * s) * h;
    let timeCalc = (start + cur) / (range / 12 / 60) + 425 + 12 * 60;

    p5.beginShape();
    p5.curveVertex(0 * responseChart, 240 - 0);
    p5.curveVertex(0 * responseChart, 240 - 0);

    for (let i = 0; i < chartResponsive.length; i++) {
      p5.curveVertex(chartResponsive[i].time, 240 - chartResponsive[i].value);
    }

    for (let i = 0; i < chartResponsive.length; i++) {
      p5.text(
        chartResponsive[i].value / 100 + " m",
        chartResponsive[i].time,
        240 - chartResponsive[i].value - 10
      );
    }

    p5.fill("#70b9ff");
    p5.curveVertex(6400 * responseChart, 240 - 0);
    p5.curveVertex(6400 * responseChart, 240 - 0);
    p5.endShape();

    p5.textSize(12);
    for (let i = start; i < start + w; i++) {
      pixel(p5, i - start, 240 + p5.sin(i * s) * h, p5.color(255, 100, 0));
    }

    p5.rect(sunX - 5, sunY - 5, 10, 10);

    hour = p5.round(((timeCalc - 30) / 60) % 24);
    minute = leftPad(p5.round(timeCalc % 60), 2);
    if (hour > 12) {
      sessionDay = "pm";
      hour = hour % 12;
    }
    if (hour === 0) {
      hour = 12;
    }

    p5.fill(p5.color(0, 0, 0, 100));

    for (let i = 0; i < 5; i++) {
      p5.rect(
        -320 * responseChart + i * 2000 * responseChart,
        0,
        800 * responseChart,
        240
      );
    }

    for (let i = 0; i < 5; i++) {
      if (
        sunX > -320 * responseChart + i * 2000 * responseChart &&
        sunX <
          -320 * responseChart + i * 2000 * responseChart + 800 * responseChart
      ) {
        p5.rect(sunX - 11, 100, 20, 20);
      }
    }

    p5.fill("#bbbfc3").textSize(16);
    p5.rect(0, 240, p5.width, 280);

    p5.fill("black");
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text(hour + " : " + minute + " " + sessionDay, cur, 260);
  };

  return (
    <div>
      <div
        ref={myDiv}
        style={{
          display: "block",
          position: "relative",
          maxWidth: "1000px",
          margin: "0 auto",
          overflow: "auto",
        }}
      >
        <Sketch setup={setup} draw={draw} className="p5" />
        <div
          style={{
            backgroundColor: "#bbbfc3",
            display: "sticky",
            position: "sticky",
            left: 0,
          }}
        >
          <div
            style={{
              width: "2px",
              backgroundImage: "linear-gradient(#fff, #bbbfc3)",
              position: "absolute",
              height: "200px",
              bottom: "0px",
              marginBottom: "45px",
              left: "calc(50% - 1px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SunsetChart;
