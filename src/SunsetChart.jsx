import React, { useRef } from "react";
import Sketch from "react-p5";

function SunsetChart() {
  const myDiv = useRef();
  const myCanvas = useRef();
  const moon = useRef();
  const sun = useRef();
  const divTime = useRef();
  const divDay = useRef();

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
  let highGraph = 140;
  let w = 6400;
  let widthDiv = 0;
  let start = 0;
  let responsive = 1;
  let dayStart = 13;
  let month = "April";

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

  const numberToTime = (cur) => {
    let sessionDay = "am";
    let timeCalc = (start + cur) / (widthDiv / 12 / 60) + 425 + 12 * 60;
    let hour = Math.round(((timeCalc - 30) / 60) % 24);
    let minute = leftPad(Math.round(timeCalc % 60), 2);
    if (hour > 12) {
      sessionDay = "pm";
      hour = hour % 12;
    }
    hour = hour === 0 ? 12 : hour;

    return hour + ":" + minute + " " + sessionDay;
  };

  const setup = (p5, canvasParentRef) => {
    p5.pixelDensity(1.3);
    p5.noStroke();
    widthDiv = canvasParentRef.offsetWidth;
    responsive = widthDiv / 1000;
    start = (425 - 15) * responsive;

    chart.forEach((item) => {
      let t = (item.time * myDiv.current.offsetWidth) / 1000;
      chartResponsive.push({ time: t, value: item.value });
    });

    p5.createCanvas(widthDiv * 6, 280).parent(canvasParentRef);

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
      let calcNight = -320 * responsive + i * 2000 * responsive;
      p5.rect(calcNight, 0, 800 * responsive, 240);
    }

    // Write tide
    p5.fill("#63ddff5c");
    chartResponsive.forEach((item, index) => {
      if (index > 2 && index < chartResponsive.length - 3) {
        p5.rect(item.time - 35, 240 - item.value + 10, 70, -40, 12);
      }
    });

    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.fill("#0059ff").textSize(16);
    chartResponsive.forEach((item, index) => {
      if (index > 2 && index < chartResponsive.length - 3) {
        p5.text(item.value / 100 + "m", item.time, 240 - item.value - 15);
      }
    });

    p5.fill("#0059ff").textSize(14);
    chartResponsive.forEach((item, index) => {
      if (index > 2 && index < chartResponsive.length - 3) {
        p5.text(numberToTime(item.time), item.time, 240 - item.value);
      }
    });

    // Draw sunset graph
    p5.fill(p5.color(255, 100, 0));
    p5.textSize(12);
    for (let i = start; i < start + w; i++) {
      pixel(p5, i - start, 240 + p5.sin((i * Math.PI) / widthDiv) * highGraph);
    }
  };

  const draw = (p5) => {
    let cur =
      myCanvas.current.canvasParentRef.current.scrollLeft + widthDiv / 2;
    let sunX = cur;
    let sunY =
      p5.sin(((start + cur) * Math.PI) / widthDiv) * highGraph -
      (myDiv.current.offsetHeight - 280 + 48);

    // draw sun
    sun.current.style.display = "block";
    sun.current.style.top = sunY + "px";
    if (sunY - (myDiv.current.offsetHeight - 280 + 48) > -100) {
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
    divTime.current.innerHTML = numberToTime(cur);

    // --------------day--------------

    divDay.current.innerHTML =
      dayStart +
      (cur - 80 * responsive - ((cur - 80 * responsive) % (widthDiv * 2))) /
        (widthDiv * 2) +
      " " +
      month;
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
          width: "100%",
        }}
      >
        <Sketch
          setup={setup}
          draw={draw}
          className="p5"
          ref={myCanvas}
          style={{ overflowX: "auto", margin: "auto" }}
        />
        <div
          style={{
            // backgroundColor: "#bbbfc3",
            display: "sticky",
            position: "sticky",
            left: 0,
          }}
        >
          <div
            style={{
              width: "2px",
              backgroundImage: "linear-gradient(#fff, #ccc)",
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
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "45px",
              top: "-65px",
              left: 0,
              backgroundColor: "#ccc",
              textAlign: "center",
              display: "flex",
              alignContent: "center",
            }}
          >
            <div
              style={{ margin: "auto", display: "flex", alignItems: "center" }}
              ref={divTime}
            ></div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "-260px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            ref={divDay}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "-260px",
              left: "20px",
            }}
          >
            <span style={{ color: "cyan" }}>Tide</span>
            <span style={{ color: "cyan" }}> • </span>
            <span style={{ color: "orange" }}>Sunrise & Sunset</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SunsetChart;
