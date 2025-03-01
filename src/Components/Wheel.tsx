"use client"
import anime from "animejs";
import React, { JSX } from "react";
import { useEffect } from "react";
import { rouletteData, WheelNumber } from "./Global";
import "./styles.css";

const Wheel = (props: { rouletteData: rouletteData, number: WheelNumber }): JSX.Element => {
  const totalNumbers = 37;
  const singleSpinDuration = 5000;
  const singleRotationDegree = 360 / totalNumbers;
  let lastNumber = 0;

  const rouletteWheelNumbers = props.rouletteData.numbers;
  console.log(props.rouletteData);
  console.log(props.number);

  const getRouletteIndexFromNumber = (number: string) => {
    return rouletteWheelNumbers.indexOf(parseInt(number));
  };

  const nextNumber = (number: any) => {
    const value = number;
    return value;
  };

  const getRotationFromNumber = (number: string) => {
    const index = getRouletteIndexFromNumber(number);
    return singleRotationDegree * index;
  };

  // rotateTo randomizes the end outcome of the wheel
  // so it doesn't only end at 0 at the top
  const getRandomEndRotation = (minNumberOfSpins: number, maxNumberOfSpins: number) => {
    const rotateTo = anime.random(
      minNumberOfSpins * totalNumbers,
      maxNumberOfSpins * totalNumbers
    );

    return singleRotationDegree * rotateTo;
  };

  // calculating where the zero will be at the end of the spin
  // because we are spinning it counter clockwise we are substracting it of 360
  const getZeroEndRotation = (totalRotaiton: number) => {
    const rotation = 360 - Math.abs(totalRotaiton % 360);

    return rotation;
  };

  // Where the ball end position should be
  // we are calculating this based on the zero rotation
  // and how much the wheel spins
  const getBallEndRotation = (zeroEndRotation: number, currentNumber: any) => {
    return Math.abs(zeroEndRotation) + getRotationFromNumber(currentNumber);
  };

  // randomizing the number of spins that the ball should make
  // so every spin is different
  const getBallNumberOfRotations = (minNumberOfSpins: number, maxNumberOfSpins: number) => {
    const numberOfSpins = anime.random(minNumberOfSpins, maxNumberOfSpins);
    return 360 * numberOfSpins;
  };

  function spinWheel(number: number) {
    const bezier = [0.165, 0.84, 0.44, 1.005];
    const ballMinNumberOfSpins = 2;
    const ballMaxNumberOfSpins = 4;
    const wheelMinNumberOfSpins = 2;
    const wheelMaxNumberOfSpins = 4;

    const currentNumber = nextNumber(number);

    const lastNumberRotation = getRotationFromNumber(lastNumber.toString()); //anime.get(wheel, "rotate", "deg");

    // minus in front to reverse it so it spins counterclockwise
    const endRotation = -getRandomEndRotation(
      ballMinNumberOfSpins,
      ballMaxNumberOfSpins
    );
    const zeroFromEndRotation = getZeroEndRotation(endRotation);
    const ballEndRotation =
      getBallNumberOfRotations(wheelMinNumberOfSpins, wheelMaxNumberOfSpins) +
      getBallEndRotation(zeroFromEndRotation, currentNumber);

    // reset to the last number
    anime.set([".layer-2", ".layer-4"], {
      rotate: function () {
        return lastNumberRotation;
      }
    });

    // reset zero
    anime.set(".ball-container", {
      rotate: function () {
        return 0;
      }
    });

    anime({
      targets: [".layer-2", ".layer-4"],
      rotate: function () {
        return endRotation; // random number
      },
      duration: singleSpinDuration, // random duration
      easing: `cubicBezier(${bezier.join(",")})`,
      complete: function () {
        lastNumber = currentNumber;
      }
    });

    // animate ball
    anime({
      targets: ".ball-container",
      translateY: [
        { value: 0, duration: 2000 },
        { value: 20, duration: 1000 },
        { value: 25, duration: 900 },
        { value: 50, duration: 1000 }
      ],
      rotate: [{ value: ballEndRotation, duration: singleSpinDuration }],
      loop: 1,
      easing: `cubicBezier(${bezier.join(",")})`
    });
  }

  useEffect(() => {
    const nextNubmer = props.number.next;
    if (nextNubmer != null && nextNubmer !== "") {
      const nextNumberInt = parseInt(nextNubmer);
      spinWheel(nextNumberInt);
    }
  }, [props.number]);

  const layers = ['layer-2', 'layer-3', 'layer-4', 'layer-5'];

  return (
    <div className={"roulette-wheel"}>
      {layers.map((layer, index) => (
        <div key={index} className={layer} style={{ transform: "rotate(0deg)" }}></div>
      ))}
      <div className={"ball-container"} style={{ transform: "rotate(0deg)" }}>
        <div className={"ball"} style={{ transform: "translate(0, -163.221px)" }}></div>
      </div>
    </div>
  );
};

export default Wheel;
