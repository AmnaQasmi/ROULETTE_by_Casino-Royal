'use client'
import React from "react";
import classNames from "classnames";

interface ChipProps {
  currentItemChips?: { sum: number };
  currentItem: { type: string; value: number };
  leftMin?: number;
  leftMax?: number;
  topMin?: number;
  topMax?: number;
}

export const Chip: React.FC<ChipProps> = ({
  currentItemChips,
  currentItem,
  leftMin = -10,
  leftMax = 10,
  topMin = -30,
  topMax = 0,
}): React.ReactElement => {
  const randomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const getChipClasses = (chip: number): string => {
    return classNames({
      "chip-100-placed": chip === 100,
      "chip-20-placed": chip === 20,
      "chip-10-placed": chip === 10,
      "chip-5-placed": chip === 5,
      chipValueImage: true,
    });
  };

  if (currentItemChips) {
    let total = 0;
    const chipsImgs: React.ReactElement[] = [];

    while (total < currentItemChips.sum) {
      let currentChip = 100;
      const remainingSum = currentItemChips.sum - total;
      let calc = 0;
      let currentChipPlaced = 0;

      if (remainingSum >= 100) {
        calc = remainingSum - (remainingSum % 100);
        total += calc;
        currentChipPlaced = calc / 100;
      } else if (remainingSum >= 20) {
        currentChip = 20;
        calc = remainingSum - (remainingSum % 20);
        total += calc;
        currentChipPlaced = calc / 20;
      } else if (remainingSum >= 10) {
        currentChip = 10;
        calc = remainingSum - (remainingSum % 10);
        total += calc;
        currentChipPlaced = calc / 10;
      } else {
        currentChip = 5;
        calc = remainingSum - (remainingSum % 5);
        total += calc;
        currentChipPlaced = calc / 5;
      }

      for (let i = 0; i < currentChipPlaced; i++) {
        const key = `${currentItem.type}_${currentItem.value}_${currentChip}_${i}`;
        const style = {
          top: `${randomNumber(topMin, topMax)}px`,
          left: `${randomNumber(leftMin, leftMax)}px`,
        };
        chipsImgs.push(
          <div
            key={key}
            style={style}
            className={getChipClasses(currentChip)}
          ></div>
        );
      }
    }

    return <div className="chipValue">{chipsImgs}</div>;
  }

  return <></>;
};

export default Chip;