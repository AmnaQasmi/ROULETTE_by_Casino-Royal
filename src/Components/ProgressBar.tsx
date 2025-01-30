"use client";
import anime from "animejs";
import React, { useEffect } from "react";
import { GameStages } from "./Global";

interface ProgressBarRoundProps {
  stage: GameStages;
  maxDuration: number;
  currentDuration: number;
}

const ProgressBarRound: React.FC<ProgressBarRoundProps> = ({
  stage,
  maxDuration,
  currentDuration,
}): React.ReactElement => {
  useEffect(() => {
    console.log("stage:", stage);
    console.log("maxDuration:", maxDuration);
    console.log("currentDuration:", currentDuration);

    const duration = (maxDuration - currentDuration) * 1000;
    console.log("Animation duration:", duration);

    const animation = anime({
      targets: ".linearProgressRounds",
      value: [0, 100],
      easing: "linear",
      autoplay: true,
      duration: duration,
    });

    return () => {
      animation.pause(); // Clean-up animation on unmount
    };
  }, [stage, maxDuration, currentDuration]);

  const getStageLabel = (): string => {
    switch (stage) {
      case GameStages.PLACE_BET:
        return "PLACE BET";
      case GameStages.WINNERS:
        return "WINNERS";
      default:
        return "NO MORE BETS";
    }
  };

  return (
    <div>
      <div className="progressRoundTitle">{getStageLabel()}</div>
      <progress className="linearProgressRounds" value={0} max={100} />
    </div>
  );
};

export default ProgressBarRound;
