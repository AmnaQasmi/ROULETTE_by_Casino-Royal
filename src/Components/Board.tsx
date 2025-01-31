"use client"
import React from "react";
import { ValueType, Item } from "./Global";
import ChipComponent from "./ChipComponent";
let classNames = require("classnames");

class Board extends React.Component<any, any> {
  numbers: Item[][];
  other_1_12 = { type: ValueType.NUMBERS_1_12 } as Item;
  other_2_12 = { type: ValueType.NUMBERS_2_12 } as Item;
  other_3_12 = { type: ValueType.NUMBERS_3_12 } as Item;
  other_1_18 = { type: ValueType.NUMBERS_1_18 } as Item;
  other_19_36 = { type: ValueType.NUMBERS_19_36 } as Item;
  other_even = { type: ValueType.EVEN } as Item;
  other_odd = { type: ValueType.ODD } as Item;
  other_red = { type: ValueType.RED } as Item;
  other_black = { type: ValueType.BLACK } as Item;
  totalNumbers = 37;
  rouletteWheenNumbers: number[];

  constructor(props: { rouletteData: { numbers: number[]; }; }) {
    super(props);
    this.onCellClick = this.onCellClick.bind(this);

    this.numbers = this.getNumbersList();
    this.rouletteWheenNumbers = props.rouletteData.numbers;
  }

  getRouletteColor = (number: number) => {
    let index = this.rouletteWheenNumbers.indexOf(number);
    const i =
      index >= 0
        ? index % this.totalNumbers
        : this.totalNumbers - Math.abs(index % this.totalNumbers);
    return i == 0 || number == null ? "none" : i % 2 == 0 ? "black" : "red";
  };

  getCellItemFromCellItemType(type: any) { }
  getClassNamesFromCellItemType(type: ValueType, number: number | null) {
    let isEvenOdd = 0;
    if (number != null && type === ValueType.NUMBER && number !== 0) {
      if (number % 2 === 0) {
        isEvenOdd = 1;
      } else {
        isEvenOdd = 2;
      }
    }
    let numberValue = "value-" + number;
    let cellClass = classNames({
      [`${numberValue}`]: true,
      "board-cell-number": type === ValueType.NUMBER,
      "board-cell-double-split": type === ValueType.DOUBLE_SPLIT,
      "board-cell-quad-split": type === ValueType.QUAD_SPLIT,
      "board-cell-triple-split": type === ValueType.TRIPLE_SPLIT,
      "board-cell-empty": type === ValueType.EMPTY,
      "board-cell-even": type === ValueType.EVEN || isEvenOdd === 1,
      "board-cell-odd": type === ValueType.ODD || isEvenOdd === 2,
      "board-cell-number-1-18":
        type === ValueType.NUMBERS_1_18 ||
        (number !== null && number >= 1 && number <= 18 && type === ValueType.NUMBER),
      "board-cell-number-19-36":
        type === ValueType.NUMBERS_19_36 ||
        (number !== null && number >= 19 && number <= 36 && type === ValueType.NUMBER),
      "board-cell-number-1-12":
        type === ValueType.NUMBERS_1_12 ||
        (number !== null && number % 3 === 0 && type === ValueType.NUMBER && number !== 0),
      "board-cell-number-2-12":
        type === ValueType.NUMBERS_2_12 ||
        (number !== null && number % 3 === 2 && type === ValueType.NUMBER),
      "board-cell-number-3-12":
        type === ValueType.NUMBERS_3_12 ||
        (number !== null && number % 3 === 1 && type === ValueType.NUMBER),
      "board-cell-red":
        type === ValueType.RED ||
        (number !== null && this.getRouletteColor(number) === "red" && type === ValueType.NUMBER),
      "board-cell-black":
        type === ValueType.BLACK ||
        (number !== null && this.getRouletteColor(number) === "black" && type === ValueType.NUMBER)
    });

    return cellClass;
  }

  getNumbersList() {

    let colList: Array<Array<Item>> = [];
    let difference = 3;

    for (let i = 1; i <= 5; i++) {
      let rowList: Array<Item> = [];
      let startNumberSub = 0;
      if (i === 3) {
        startNumberSub = 1;
      } else if (i == 5) {
        startNumberSub = 2;
      }

      let nextStartNumberSub = 0;
      if (i + 1 === 3) {
        nextStartNumberSub = 1;
      } else if (i + 1 === 5) {
        nextStartNumberSub = 2;
      }
      let prevStartNumberSub = 0;
      if (i - 1 === 3) {
        prevStartNumberSub = 1;
      } else if (i - 1 === 5) {
        prevStartNumberSub = 2;
      }
      if (i === 1) {
        let cell = {} as Item;
        cell.type = ValueType.NUMBER;
        cell.value = 0;

        rowList.push(cell);
      }
      for (let j = 1; j <= 26; j++) {
        let cell = {} as Item;

        if (j > 24) {
          cell.type = ValueType.EMPTY;
          rowList.push(cell);
          continue;
        }
        // 2, 4 mid splits
        if (i % 2 === 0) {
          if (j === 1) {
            let leftNumber = 0;
            let topNumber = difference - prevStartNumberSub;
            let bottomNumber = difference - nextStartNumberSub;

            cell.type = ValueType.TRIPLE_SPLIT;
            cell.valueSplit = [leftNumber, topNumber, bottomNumber];
            rowList.push(cell);
          } else {
            if (j % 2 === 0) {
              let topNumber =
                ((j - 2) / 2) * difference + difference - prevStartNumberSub;
              let bottomNumber =
                ((j - 2) / 2) * difference + difference - nextStartNumberSub;
              cell.type = ValueType.DOUBLE_SPLIT;
              cell.valueSplit = [topNumber, bottomNumber];
              rowList.push(cell);
            } else {
              let leftNumber = ((j - 1) / 2) * difference - prevStartNumberSub;
              let rightNumber = leftNumber + difference;
              let bottomLeftNumber =
                ((j - 1) / 2) * difference - nextStartNumberSub;
              let bottomRightNumber = bottomLeftNumber + difference;
              cell.type = ValueType.QUAD_SPLIT;
              cell.valueSplit = [
                leftNumber,
                rightNumber,
                bottomLeftNumber,
                bottomRightNumber
              ];
              rowList.push(cell);
            }
          }
        } else {
          // 1, 3, 5 normal rows
          if (j === 1) {
            let leftNumber = 0;
            let rightNumber = leftNumber + difference;
            cell.type = ValueType.DOUBLE_SPLIT;
            cell.valueSplit = [leftNumber, rightNumber];
            rowList.push(cell);
          } else {
            if (j % 2 === 0) {
              let currentNumber =
                ((j - 2) / 2) * difference + difference - startNumberSub;
              cell.type = ValueType.NUMBER;
              cell.value = currentNumber;
              rowList.push(cell);
            } else {
              let leftNumber = ((j - 1) / 2) * difference - startNumberSub;
              let rightNumber = leftNumber + difference;
              cell.type = ValueType.DOUBLE_SPLIT;
              cell.valueSplit = [leftNumber, rightNumber];
              rowList.push(cell);
            }
          }
        }
      }
      colList.push(rowList);
    }
    console.log(colList);
    return colList;
  }

  onCellClick = (item: any) => {
    this.props.onCellClick(item);
  };

  render() {
    let currentItemChips_1_12 = this.props.chipsData.placedChips.get(
      this.other_1_12
    );
    let currentItemChips_2_12 = this.props.chipsData.placedChips.get(
      this.other_2_12
    );
    let currentItemChips_3_12 = this.props.chipsData.placedChips.get(
      this.other_3_12
    );
    let currentItemChips_1_18 = this.props.chipsData.placedChips.get(
      this.other_1_18
    );
    let currentItemChips_even = this.props.chipsData.placedChips.get(
      this.other_even
    );
    let currentItemChips_red = this.props.chipsData.placedChips.get(
      this.other_red
    );
    let currentItemChips_black = this.props.chipsData.placedChips.get(
      this.other_black
    );
    let currentItemChips_odd = this.props.chipsData.placedChips.get(
      this.other_odd
    );
    let currentItemChips_19_36 = this.props.chipsData.placedChips.get(
      this.other_19_36
    );

    return (
      <div className="roulette-board-wrapper hideElementsTest">
        <div className="roulette-board">
          <div className="roulette-board-grid-numbers">
            <table>
              <tbody>
                {this.numbers.map((row, rowIndex) => (
                  <tr key={`row_${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`cell_${rowIndex}_${cellIndex}_${cell.value}`}
                      className={this.getClassNamesFromCellItemType(cell.type, cell.value ?? null)}
                    >
                      {cell.value != null && (
                        <ChipComponent
                          key={`chip_${rowIndex}_${cellIndex}_${cell.value}`}
                          cell={cell}
                          onCellClick={this.onCellClick}
                          currentItemChips={undefined}
                          tdKey={undefined}
                          cellClass={undefined}
                          chipKey={undefined}
                          leftMin={undefined}
                          leftMax={undefined}
                          topMin={undefined}
                          topMax={undefined}
                          rowSpan={undefined}
                          colSpan={undefined}
                        />
                      )}
                    </td>
                  ))}
                </tr>
                
                ))}
                {this.numbers.map((item, index) => {
                  console.log(this.numbers);
                  let keyId = 0;
                  return (
                    <tr key={"tr_board_" + index}>
                      {item.map((cell) => {
                        let cellClass = this.getClassNamesFromCellItemType(
                          cell.type,
                          cell.value ?? null
                        );
                        if (
                          cell.type === ValueType.NUMBER &&
                          cell.value === 0
                        ) {
                          let tdKey = "td_" + cell.type + "_" + cell.value;
                          let chipKey = "chip_" + cell.type + "_" + cell.value;

                          let currentItemChips = this.props.chipsData.placedChips.get(
                            cell
                          );
                          let chipKeyValue = cell.value !== undefined ? cell.value.toString() : "split_" + cell.valueSplit;
                          // let tdKey:string = `td_${cell.type}_${chipKeyValue}`;
                          // let chipKey = `chip_${cell.type}_${chipKeyValue}`;
                          return (
                            <ChipComponent
                              key={`chip_${tdKey}_${chipKey}`} // Unique key here
                              currentItemChips={currentItemChips}
                              tdKey={tdKey}
                              chipKey={chipKey}
                              cell={cell}
                              rowSpan={1}
                              colSpan={1}
                              cellClass={cellClass}
                              onCellClick={this.onCellClick}
                              leftMin={undefined}
                              leftMax={undefined}
                              topMin={undefined}
                              topMax={undefined}
                            />
                          );
                        } else {
                          let chipKeyValue = cell.value + "";
                          if (cell.value === undefined) {
                            let split = cell.valueSplit + "";
                            chipKeyValue = "split_" + split;
                          }
                          let tdKey = "td_" + cell.type + "_" + chipKeyValue;
                          let chipKey =
                            "chip_" + cell.type + "_" + chipKeyValue;

                          if (cell.type === ValueType.EMPTY) {
                            keyId++;
                            return (
                              <td key={`empty_${keyId}`} className={cellClass}></td> // Unique key
                            );

                          } else {
                            let currentItemChips = this.props.chipsData.placedChips.get(
                              cell
                            );
                            return (
                              <ChipComponent
                                key={`chip_${tdKey}_${chipKey}`} // Unique key
                                currentItemChips={currentItemChips}
                                tdKey={tdKey}
                                chipKey={chipKey}
                                cell={cell}
                                cellClass={cellClass}
                                rowSpan={5}
                                colSpan={1}
                                onCellClick={this.onCellClick}
                                leftMin={undefined}
                                leftMax={undefined}
                                topMin={undefined}
                                topMax={undefined}
                              />

                            );
                          }
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="roulette-board-grid-other">
            <table>
              <tbody>
                {this.numbers.map((row, rowIndex) => (
                 <tr key={`row_${rowIndex}`}>
                 {row.map((cell, cellIndex) => (
                   <td
                     key={`cell_${rowIndex}_${cellIndex}_${cell.value}`}
                     className={this.getClassNamesFromCellItemType(cell.type, cell.value ?? null)}
                   >
                     {cell.value != null && (
                       <ChipComponent
                         key={`chip_${rowIndex}_${cellIndex}_${cell.value}`}
                         cell={cell}
                         onCellClick={this.onCellClick}
                         currentItemChips={null} // Replaced `undefined` with `null`
                         tdKey={null} // Replaced `undefined` with `null`
                         cellClass={null} // Replaced `undefined` with `null`
                         chipKey={null} // Replaced `undefined` with `null`
                         leftMin={undefined} // Replaced `undefined` with `null`
                         leftMax={undefined} // Replaced `undefined` with `null`
                         topMin={undefined} // Replaced `undefined` with `null`
                         topMax={undefined} // Replaced `undefined` with `null`
                         rowSpan={undefined} // Replaced `undefined` with `null`
                         colSpan={undefined} // Replaced `undefined` with `null`
                       />
                     )}
                   </td>
                 ))}
               </tr>
               
                ))}
                <tr>
                  <td colSpan={2}></td>

                  <ChipComponent
                    key={"chip_other_1_12"}  // Add a unique key here
                    currentItemChips={currentItemChips_1_12}
                    tdKey={"td_other_1_12"}
                    chipKey={"chip_other_1_12"}
                    cell={this.other_1_12}
                    rowSpan={1}
                    colSpan={7}
                    leftMin={70}
                    leftMax={140}
                    cellClass={this.getClassNamesFromCellItemType(
                      ValueType.NUMBERS_1_12,
                      null
                    )}
                    onCellClick={this.onCellClick}
                    topMin={undefined}
                    topMax={undefined}
                  />
                  <td></td>
                  <ChipComponent
                    key={"chip_other_2_12"}  // Add a unique key here
                    currentItemChips={currentItemChips_2_12}
                    tdKey={"td_other_2_12"}
                    chipKey={"chip_other_2_12"}
                    cell={this.other_2_12}
                    rowSpan={1}
                    colSpan={7}
                    leftMin={70}
                    leftMax={140}
                    cellClass={this.getClassNamesFromCellItemType(
                      ValueType.NUMBERS_2_12,
                      null
                    )}
                    onCellClick={this.onCellClick} topMin={undefined} topMax={undefined} />
                  <td></td>
                  <ChipComponent
                    key={"chip_other_3_12"}  // Add a unique key here
                    currentItemChips={currentItemChips_3_12}
                    tdKey={"td_other_3_12"}
                    chipKey={"chip_other_3_12"}
                    cell={this.other_3_12}
                    rowSpan={1}
                    colSpan={7}
                    leftMin={70}
                    leftMax={140}
                    cellClass={this.getClassNamesFromCellItemType(
                      ValueType.NUMBERS_3_12,
                      null
                    )}
                    onCellClick={this.onCellClick} topMin={undefined} topMax={undefined} />
                </tr>
                <tr>
                  <td colSpan={2}></td>
                  <ChipComponent
                    key={"chip_other_1_18"}  // Add a unique key here
                    currentItemChips={currentItemChips_1_18}
                    tdKey={"td_other_1_18"}
                    chipKey={"chip_other_1_18"}
                    cell={this.other_1_18}
                    rowSpan={1}
                    colSpan={3}
                    leftMin={30}
                    leftMax={60}
                    cellClass={this.getClassNamesFromCellItemType(
                      ValueType.NUMBERS_1_18,
                      null
                    )}
                    onCellClick={this.onCellClick} topMin={undefined} topMax={undefined} />
                  <td></td>
                  <ChipComponent
                    key={"chip_other_red"}  // Add a unique key here
                    currentItemChips={currentItemChips_red}
                    tdKey={"td_other_red"}
                    chipKey={"chip_other_red"}
                    cell={this.other_red}
                    rowSpan={1}
                    colSpan={3}
                    leftMin={30}
                    leftMax={60}
                    cellClass={this.getClassNamesFromCellItemType(
                      ValueType.RED,
                      null
                    )}
                    onCellClick={this.onCellClick} topMin={undefined} topMax={undefined} />
                  <td></td>
                  <ChipComponent
                    key={"chip_other_black"}  // Add a unique key here
                    currentItemChips={currentItemChips_black}
                    tdKey={"td_other_black"}
                    chipKey={"chip_other_black"}
                    cell={this.other_black}
                    rowSpan={1}
                    colSpan={3}
                    leftMin={30}
                    leftMax={60}
                    cellClass={this.getClassNamesFromCellItemType(
                      ValueType.BLACK,
                      null
                    )}
                    onCellClick={this.onCellClick} topMin={undefined} topMax={undefined} />
                  <td></td>
                  <ChipComponent
                    key={"chip_other_19_36"}  // Add a unique key here
                    currentItemChips={currentItemChips_19_36}
                    tdKey={"td_other_19_36"}
                    chipKey={"chip_other_19_36"}
                    cell={this.other_19_36}
                    rowSpan={1}
                    colSpan={3}
                    leftMin={30}
                    leftMax={60}
                    cellClass={this.getClassNamesFromCellItemType(
                      ValueType.NUMBERS_19_36,
                      null
                    )}
                    onCellClick={this.onCellClick} topMin={undefined} topMax={undefined} />
                  <td></td>
                  <ChipComponent
                    key={"chip_other_even"}  // Add a unique key here
                    currentItemChips={currentItemChips_even}
                    tdKey={"td_other_even"}
                    chipKey={"chip_other_even"}
                    cell={this.other_even}
                    rowSpan={1}
                    colSpan={3}
                    leftMin={30}
                    leftMax={60}
                    cellClass={this.getClassNamesFromCellItemType(
                      ValueType.EVEN,
                      null
                    )}
                    onCellClick={this.onCellClick} topMin={undefined} topMax={undefined} />
                  <td></td>
                  <ChipComponent
                    key={"chip_other_odd"}  // Add a unique key here
                    currentItemChips={currentItemChips_odd}
                    tdKey={"td_other_odd"}
                    chipKey={"chip_other_odd"}
                    cell={this.other_odd}
                    rowSpan={1}
                    colSpan={3}
                    leftMin={30}
                    leftMax={60}
                    cellClass={this.getClassNamesFromCellItemType(
                      ValueType.ODD,
                      null
                    )}
                    onCellClick={this.onCellClick} topMin={undefined} topMax={undefined} />

                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;

// "use client"
// import React from "react";
// import { ValueType, Item } from "./Global";
// import ChipComponent from "./ChipComponent";
// import classNames from "classnames";

// class Board extends React.Component<any, any> {
//   numbers: Item[][];
//   rouletteWheelNumbers: number[];
//   totalNumbers = 37;

//   constructor(props: { rouletteData: { numbers: number[] } }) {
//     super(props);
//     this.onCellClick = this.onCellClick.bind(this);
//     this.numbers = this.getNumbersList();
//     this.rouletteWheelNumbers = props.rouletteData.numbers;
//   }

//   getRouletteColor = (number: number) => {
//     let index = this.rouletteWheelNumbers.indexOf(number);
//     if (index === -1) return "none";
//     return index % 2 === 0 ? "black" : "red";
//   };

//   getClassNamesFromCellItemType(type: ValueType, number: number | null) {
//     let isEvenOdd = number != null && number !== 0 ? (number % 2 === 0 ? 1 : 2) : 0;
//     return classNames({
//       [`value-${number}`]: true,
//       "board-cell-number": type === ValueType.NUMBER,
//       "board-cell-double-split": type === ValueType.DOUBLE_SPLIT,
//       "board-cell-quad-split": type === ValueType.QUAD_SPLIT,
//       "board-cell-triple-split": type === ValueType.TRIPLE_SPLIT,
//       "board-cell-empty": type === ValueType.EMPTY,
//       "board-cell-even": type === ValueType.EVEN || isEvenOdd === 1,
//       "board-cell-odd": type === ValueType.ODD || isEvenOdd === 2,
//       "board-cell-number-1-18": type === ValueType.NUMBERS_1_18 || (number && number >= 1 && number <= 18),
//       "board-cell-number-19-36": type === ValueType.NUMBERS_19_36 || (number && number >= 19 && number <= 36),
//       "board-cell-red": type === ValueType.RED || (number && this.getRouletteColor(number) === "red"),
//       "board-cell-black": type === ValueType.BLACK || (number && this.getRouletteColor(number) === "black"),
//     });
//   }

//   getNumbersList() {
//     let colList: Array<Array<Item>> = [];
//     for (let i = 0; i < 5; i++) {
//       let rowList: Array<Item> = [];
//       for (let j = 0; j < 26; j++) {
//         let cell = {} as Item;
//         if (j >= 24) {
//           cell.type = ValueType.EMPTY;
//         } else {
//           cell.type = ValueType.NUMBER;
//           cell.value = j + 1;
//         }
//         rowList.push(cell);
//       }
//       colList.push(rowList);
//     }
//     return colList;
//   }

//   onCellClick = (item: any) => {
//     this.props.onCellClick(item);
//   };

//   render() {
//     return (
//       <div className="roulette-board-wrapper">
//         <div className="roulette-board">
//           <table>
//             <tbody>
//               {this.numbers.map((row, rowIndex) => (
//                 <tr key={`row_${rowIndex}`}>
//                   {row.map((cell, cellIndex) => (
//                     <td key={`cell_${rowIndex}_${cellIndex}_${cell.value}`} className={this.getClassNamesFromCellItemType(cell.type, cell.value ?? null)}>
//                       {cell.value != null && <ChipComponent key={`chip_${rowIndex}_${cellIndex}_${cell.value}`} cell={cell} onCellClick={this.onCellClick} currentItemChips={undefined} tdKey={undefined} cellClass={undefined} chipKey={undefined} leftMin={undefined} leftMax={undefined} topMin={undefined} topMax={undefined} rowSpan={undefined} colSpan={undefined} />}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }
// }

// export default Board;
