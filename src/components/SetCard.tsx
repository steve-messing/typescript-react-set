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

function getSvg(shape: SetCardShape, color: SetCardColor, fill: SetCardFill) {
  return (
    <svg height="100" width="180" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        fillOpacity={getOpacity(fill)}
        stroke={color}
        strokeOpacity={1}
        strokeWidth="3px"
        d={getShapePath(shape)}
      ></path>
    </svg>
  );
}

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

function getOpacity(fill: SetCardFill) {
  if (fill === "solid") {
    return 1;
  }
  if (fill === "striped") {
    return 0.5;
  }
  if (fill === "empty") {
    return 0;
  }
}

export const SetCard: React.FC<LiveCardProps> = (card?: LiveCardProps) => {
  return card ? (
    <>
      <button
        className={card.selected ? "selected" : undefined}
        onClick={card.onCardClick}
        style={{ borderRadius: "10px", border: card.selected ? "2px solid blue" : "1px solid grey"}}
      >
        {Array(card.number).fill(getSvg(card.shape, card.color, card.fill))}
      </button>
    </>
  ) : (
    <div className="emptySlot"/>
  );
}

export default SetCard;
