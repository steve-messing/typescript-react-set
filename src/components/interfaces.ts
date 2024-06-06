import { NamedTupleMember } from "typescript";

export const DIAMOND = "diamond"
export const OVAL = "oval"
export const SQUIGGLE = "squiggle"

export type SetCardNumber = 1 | 2 | 3;
export type SetCardShape = "oval" | "squiggle" | "diamond";
export type SetCardColor = "red" | "green" | "purple";
export type SetCardFill = "striped" | "solid" | "empty";

export interface SetCardProps {
  number: SetCardNumber;
  shape: SetCardShape;
  color: SetCardColor;
  fill: SetCardFill;
}

export interface LiveCardProps extends SetCardProps {
  index: number;
  selected: boolean;
  onCardClick: () => void;
  isSmall?: boolean;
}

