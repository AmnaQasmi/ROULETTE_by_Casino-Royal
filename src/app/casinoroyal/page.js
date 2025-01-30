"use client"
import React from "react";
import Header from "../../Components/Header";
import Board from "../../Components/Board";
import App from "../../Components/index"
// import ProgressBarRound from "../../Components/ProgressBar"
// import ChipComponent from "../../Components/ChipComponent"
// import { GameStages } from "../../Components/Global"

const CasinoRoyal = () => {
  return (
    <>
      <Header />
      <App /> 
      {/* <ProgressBarRound
        stage={GameStages.PLACE_BET}
        maxDuration={0}
        currentDuration={0}
      />
      <ChipComponent
        currentItemChips={undefined}
        tdKey={undefined}
        cellClass={undefined}
        chipKey={undefined}
        cell={undefined}
        leftMin={undefined}
        leftMax={undefined}
        topMin={undefined}
        topMax={undefined}
        rowSpan={undefined}
        colSpan={undefined}
        onCellClick={function(arg0) {
          throw new Error("Function not implemented.")
        }}
      /> */}
    </>
  )
}

export default CasinoRoyal;
