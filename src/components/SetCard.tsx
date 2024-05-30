import React from "react";
import Card from "react-bootstrap/Card";

type Number = 1 | 2 | 3;
type Shape = "oval" | "squiggle" | "diamond";
type Color = "red" | "green" | "purple";
type Fill = "striped" | "solid" | "empty";

interface CardProps {
  number: Number;
  shape: Shape;
  color: Color;
  fill: Fill;
}

function SetCard(props: CardProps) {
  return (
    <Card>
      <div className="cardContents">
        <div className="shape">shape: {props.shape}</div>
        <div className="number">number: {props.number}</div>
        <div className="color">color: {props.color}</div>
        <div className="fill">fill: {props.fill}</div>
      </div>
    </Card>
  );
}

export default SetCard;
