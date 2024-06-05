import React, { useEffect, useState } from "react";
import { LiveCardProps } from "./interfaces";
import getStartingDeck from "./SetDeck";
import SetHand from "./SetHand";

export const SetGame: React.FC = () => {
  var initialDeck = getStartingDeck();
  const [deck, setDeck] = useState(initialDeck);
  const [hand, setHand] = useState<LiveCardProps[]>([]);

  function drawCards(count: number): LiveCardProps[] {
    const cards = deck.slice(0, count);
    setDeck(deck.slice(count));
    console.log(deck.length);
    return cards;
  }

  useEffect(() => {
    setHand(drawCards(12));
  }, []);

  function addCards() {
    if (deck.length === 0 || hand.length === 15) {
      return;
    }
    const cardsToDraw = deck.length <= 3 ? deck.length : 3;
    setHand((prevHand) => [...prevHand, ...drawCards(cardsToDraw)]);
    return;
  }

  function toggleCardSelection(index: number) {
    setHand(
      hand.map((card, i) =>
        i === index ? { ...card, selected: !card.selected } : card
      )
    );
  }
  
  function handleCardClick(index: number) {
    toggleCardSelection(index);
  }
  
  let selectedCards = hand.filter((card) => card.selected);
  if (selectedCards.length === 3) {
    const foundSet = checkForSet(selectedCards);
    if (foundSet) {
      console.log("Found a set!");
      const handWithSetRemoved = hand.filter((card) => !card.selected);
      setHand(handWithSetRemoved);
      addCards();
      console.log(deck);
    } else {
      console.log("Not a set.");
    }
  }

  function allEqualOrAllDifferent(array: string[]): boolean {
    return new Set(array).size === 1 || new Set(array).size === 3;
  }

  function checkForSet(selectedCards: LiveCardProps[]): boolean | undefined {
    if (selectedCards.length !== 3) {
      return;
    }
    const numbers = selectedCards.map((card) => card.number.toString());
    const shapes = selectedCards.map((card) => card.shape);
    const colors = selectedCards.map((card) => card.color);
    const fills = selectedCards.map((card) => card.fill);
    return (
      allEqualOrAllDifferent(numbers) &&
      allEqualOrAllDifferent(shapes) &&
      allEqualOrAllDifferent(colors) &&
      allEqualOrAllDifferent(fills)
    );
  }

  return (
    <div className="game">
      <h1>Set Card Game</h1>
      <SetHand hand={hand} onCardClick={handleCardClick} />
      <button onClick={addCards}>Add 3 Cards</button>
    </div>
  );
};
