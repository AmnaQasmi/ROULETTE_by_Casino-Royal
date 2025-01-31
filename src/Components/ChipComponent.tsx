'use client'
import React from "react";
import Chip from "./Chip";
function ChipComponent(props: { currentItemChips: any; tdKey: any; cellClass: any; chipKey: any; cell: any; leftMin: number | undefined; leftMax: number | undefined; topMin: number | undefined; topMax: number | undefined; rowSpan: number | undefined; colSpan: number | undefined; onCellClick: (arg0: any) => void; }) {
  console.log("Child Render");

  const currentItemChips = props.currentItemChips;
  const tdKey = props.tdKey;
  const cellClass = props.cellClass;
  const chipKey = props.chipKey;
  const cell = props.cell;

  let sum = "";
  if (currentItemChips !== undefined) {
    if (currentItemChips.sum !== 0) {
      sum = currentItemChips.sum;
    }
  }

  let left = 0;
  let top = -15;

  if (props.leftMin !== undefined && props.leftMax !== undefined) {
    left = props.leftMin + (props.leftMax - props.leftMin) / 2;
  }

  if (props.topMin !== undefined && props.topMax !== undefined) {
    top = props.topMin + (props.topMax - props.topMin) / 2;
  }
  const style = {
    top: top + "px",
    left: left + "px"
  };

  return (
    <td
      key={tdKey}
      className={cellClass}
      rowSpan={props.rowSpan}
      colSpan={props.colSpan}
      onClick={() => {
        console.log("click");
        props.onCellClick(cell);
      }}
    >
      <Chip
        leftMin={props.leftMin}
        leftMax={props.leftMax}
        topMin={props.topMin}
        topMax={props.topMax}
        key={chipKey}
        currentItemChips={currentItemChips}
        currentItem={cell}
      />
      <div className={"chipValue"}>
        <div style={style} className={"chipSum"}>
          {sum}
        </div>
      </div>
    </td>
  );
}



export default React.memo(ChipComponent);
