import React from "react";
import { SetCard } from "./SetCard";
import { LiveCardProps } from "./interfaces";

interface FoundSetsProps {
  foundSets: LiveCardProps[][];
}

export const FoundSets: React.FC<FoundSetsProps> = ({ foundSets }) => {
  return (
    <div className="foundSets">
      {foundSets.map((set) => (
        <div className="foundSet">
          {set.map((card) => (
            <SetCard key={card.index} {...card} isSmall={true}/>
          ))}
        </div>
      ))}
    </div>
  );
};