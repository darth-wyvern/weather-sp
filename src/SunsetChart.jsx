import React, { useRef } from "react";
import Sketch from "react-p5";

function SunsetChart() {
  const myDiv = useRef();
  const moon = useRef();
  const sun = useRef();
  const chart = [
    { time: 0, value: 0 },
    { time: 0, value: 0 },
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
    { time: 6400, value: 0 },
    { time: 6400, value: 0 },
  ];

  let chartResponsive = [];

  let hour = 0;
  let minute = 0;
  let h = 140;
  let w = 6400;
  let sessionDay = "am";

  const pixel = (p5, x, y) => {
    p5.rect(x, y, 1, 1);
  };

  const leftPad = (number, targetLength) => {
    var output = number + "";
    while (output.length < targetLength) {
      output = "0" + output;
    }
    return output;
  };

  let widthDiv = 0;
  let start = 0;
  let responsive = 1;

  const numberToTime = (cur) => {
    let timeCalc = (start + cur) / (widthDiv / 12 / 60) + 425 + 12 * 60;
    hour = Math.round(((timeCalc - 30) / 60) % 24);
    minute = leftPad(Math.round(timeCalc % 60), 2);
    if (hour > 12) {
      sessionDay = "pm";
      hour = hour % 12;
    }
    hour = hour === 0 ? 12 : hour;

    return hour + " : " + minute + " " + sessionDay;
  };

  const setup = (p5, canvasParentRef) => {
    p5.pixelDensity(1);
    p5.noStroke();
    widthDiv = canvasParentRef.offsetWidth;
    responsive = widthDiv / 1000;
    start = (425 - 15) * responsive;

    // convert tide chart data
    p5.createCanvas(widthDiv * 6, 280).parent(canvasParentRef);
    for (let i = 0; i < chart.length; i++) {
      let t = p5.round((chart[i].time * myDiv.current.offsetWidth) / 1000);
      chartResponsive.push({ time: t, value: chart[i].value });
    }

    // Draw tide
    p5.fill("#70b9ff");
    p5.beginShape();
    chartResponsive.forEach((item) => {
      p5.curveVertex(item.time, 240 - item.value);
    });
    p5.endShape();

    // Draw night
    p5.fill("#0004");
    for (let i = 0; i < 5; i++) {
      let calcDay = -320 * responsive + i * 2000 * responsive;
      p5.rect(calcDay, 0, 800 * responsive, 240);
    }

    // Write tide
    p5.fill("darkcyan");
    chartResponsive.forEach((item) => {
      p5.text(item.value / 100 + " m", item.time, 240 - item.value - 10);
    });

    // Draw sunset graph
    p5.fill(p5.color(255, 100, 0));
    p5.textSize(12);
    for (let i = start; i < start + w; i++) {
      pixel(p5, i - start, 240 + p5.sin((i * Math.PI) / widthDiv) * h);
    }
  };

  const draw = (p5) => {
    let cur = myDiv.current.scrollLeft + widthDiv / 2;
    let sunX = cur;
    let sunY = 240 + Math.sin(((start + cur) * Math.PI) / widthDiv) * h;

    // draw sun
    sun.current.style.display = "block";
    sun.current.style.top = sunY - 295 + "px";
    if (sunY - 295 > -55) {
      sun.current.style.display = "none";
    }

    // Draw moon
    moon.current.style.display = "none";
    for (let i = 0; i < 5; i++) {
      let calcIsDay = -320 * responsive + i * 2000 * responsive;

      if (sunX > calcIsDay && sunX < calcIsDay + 800 * responsive) {
        moon.current.style.display = "block";
      }
    }

    // Box time
    p5.fill("#bbbfc3").textSize(16);
    p5.rect(0, 240, p5.width, 280);

    // Write time
    p5.fill("black");
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text(numberToTime(cur), cur, 260);
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
          width: "100%",
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
          <img
            src="https://cdn-icons-png.flaticon.com/512/196/196685.png"
            alt=""
            style={{
              position: "absolute",
              width: "20px",
              height: "20px",
              top: "-200px",
              left: "calc(50% - 10px)",
            }}
            ref={moon}
          />
          <img
            src="https://i.pinimg.com/originals/35/8b/f6/358bf617c093163955378bec6b0f492e.png"
            alt=""
            style={{
              position: "absolute",
              width: "20px",
              height: "20px",
              left: "calc(50% - 10px)",
            }}
            ref={sun}
          />
        </div>
      </div>
    </div>
  );
}

export default SunsetChart;
