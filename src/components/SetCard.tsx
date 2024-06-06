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
    <svg height="100" width="180" xmlns="http://www.w3.org/2000/svg">
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
      width="14.5"
      height="14.5"
      patternTransform="rotate(0)"
    >
      <line x1="0" y="0" x2="0" y2="14.5" stroke="#194d33" stroke-width="9" />
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
    return "m 20 20 l 50 20 l 50 -20 l 50 50 l -10 10 l -50 -20 l -50 20 l -50 -50 l 10 -10 z";
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
