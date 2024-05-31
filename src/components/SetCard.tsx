import "./styles.css";
import { DIAMOND, OVAL, SQUIGGLE, SetCardColor, SetCardFill, SetCardProps, SetCardShape } from "./interfaces";

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
  )
}

function getShapePath(shape: SetCardShape) {
  if (shape === DIAMOND) {
    return "m10,50 l80,40 l80,-40 l-80,-40 l-80, 40 z"
  }
  if (shape === OVAL) {
    return "m50,10 A 1 1 0 0 0 50 90 l80,0 A 1 1 0 0 0 130 10 Z"
  }
  if (shape === SQUIGGLE) {
    return "m 20 20 l 50 20 l 50 -20 l 50 50 l -10 10 l -50 -20 l -50 20 l -50 -50 l 10 -10 z"
  }
};

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

function SetCard(props: SetCardProps) {
  return (
    <>
      <div className="playingCard">
        {Array(props.number).fill(getSvg(props.shape, props.color, props.fill))}
      </div>
    </>
  );
}

export default SetCard;
