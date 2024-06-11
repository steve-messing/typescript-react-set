import "./styles.css";
import {
  DIAMOND,
  LiveCardProps,
  OVAL,
  SQUIGGLE,
  SetCardColor,
  SetCardFill,
  SetCardShape,
} from "./interfaces";
import React from "react";

function getFill(fill: SetCardFill, color: SetCardColor) {
  if (fill === "striped") {
    return `url(#pattern-${color})`;
  }
  if (fill === "empty") {
    return "none";
  }
} 

const getPattern = (color: SetCardColor) => {
  return (
    <defs>
      <pattern
        id={`pattern-${color}`}
        patternUnits="userSpaceOnUse"
        width="9"
        height="9"
        patternTransform="rotate(0)"
      >
        <line x1="0" y="0" x2="0" y2="9" stroke={color} stroke-width="6" />
      </pattern>
    </defs>
  );
}

function getSvg(shape: SetCardShape, color: SetCardColor, fill: SetCardFill) {
  return (
    <svg height="100" width="180" xmlns="http://www.w3.org/2000/svg" viewBox={shape === "squiggle" ? "24 20 100 100" : undefined}>
      {getPattern(color)}
      <path
        fill={fill === "solid" ? color : getFill(fill, color)}
        stroke={color}
        strokeOpacity={1}
        strokeWidth="3px"
        d={getShapePath(shape)}
      ></path>
    </svg>
  );
}

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <pattern
      id="pattern_AvH8"
      patternUnits="userSpaceOnUse"
      width="30"
      height="30"
      patternTransform="rotate(0)"
    >
      <line x1="0" y="0" x2="0" y2="30" stroke="#194d33" stroke-width="9" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#pattern_AvH8)" opacity="1" />
</svg>;

function getShapePath(shape: SetCardShape) {
  if (shape === DIAMOND) {
    return "m10,50 l80,40 l80,-40 l-80,-40 l-80, 40 z";
  }
  if (shape === OVAL) {
    return "m50,10 A 1 1 0 0 0 50 90 l80,0 A 1 1 0 0 0 130 10 Z";
  }
  if (shape === SQUIGGLE) {
    return "M22.582,107.452 C18.135,108.263 15.027,106.351 12.648,102.714 C9.892,98.417 8.488,93.394 7.914,88.598 C7.183,82.162 7.641,75.807 9.000,69.505 C12.383,54.824 24.258,42.622 40.089,40.32 C50.596,38.792 60.476,41.126 69.941,45.625 C75.812,48.415 81.883,50.614 88.318,51.665 C98.739,53.366 108.370,51.364 117.108,45.348 C120.941,43.398 124.790,41.47 128.593,39.477 C134.241,33.329 140.878,38.069 144.540,45.297 C147.307,50.760 147.175,56.637 146.076,62.561 C142.724,80.623 127.558,96.421 109.646,100.358 C99.593,102.568 89.521,101.333 80.344,97.598 C74.765,95.411 69.259,93.949 63.269,92.986 C56.478,91.816 49.734,91.714 43.098,95.401 C38.295,98.040 33.347,101.188 28.621,104.002 C25.405,105.601 22.097,107.073 22.582,107.452 M68.006,47.035 z"
  }
}

export const SetCard: React.FC<LiveCardProps> = (card?: LiveCardProps) => {
  return card ? (
    <>
      <button
        className={card.selected ? "selected" : undefined}
        onClick={card.onCardClick}
        style={{
          borderRadius: "10px",
          border: card.selected ? "2px solid blue" : "1px solid grey",
        }}
      >
        {Array(card.number).fill(getSvg(card.shape, card.color, card.fill))}
      </button>
    </>
  ) : (
    <div className="emptySlot" />
  );
};

export default SetCard;
