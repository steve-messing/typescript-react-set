import React, { useState, useEffect } from 'react';
import SetCard from "./SetCard";
import { LiveCardProps } from "./interfaces";

interface SetHandProps {
  hand: LiveCardProps[];
  onCardClick: (index: number) => void;
}

const SetHand: React.FC<SetHandProps> = ({ hand, onCardClick }) => {
  return (
    <div className={hand.length > 12 ? "extendedHand" : "standardHand"}>
      {hand.map((card, index) => (
        <SetCard
          key={index}
          {...card}
          onCardClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}

export default SetHand;