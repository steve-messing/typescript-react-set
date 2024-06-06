import React, { useEffect, useState } from "react";
import { LiveCardProps } from "./interfaces";
import getStartingDeck from "./SetDeck";
import SetHand from "./SetHand";
import { FoundSets } from "./FoundSets";

export const SetGame: React.FC = () => {
  var initialDeck = getStartingDeck();
  const [deck, setDeck] = useState(initialDeck);
  const [hand, setHand] = useState<LiveCardProps[]>([]);
  const [foundSets, setFoundSets] = useState<LiveCardProps[][]>([]);

  function drawCards(count: number): LiveCardProps[] {
    const cards = deck.slice(0, count);
    setDeck(deck.slice(count));
    return cards;
  }

  useEffect(() => {
    setHand(drawCards(12));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function replaceCardsAfterSet(indices: number[], newCards: LiveCardProps[]) {
    const newHand = hand.map((card, i) =>
      indices.includes(i) ? newCards.shift()! : card
    );
    setHand(newHand);
  }

  function addCards() {
    if (deck.length > 0 && hand.length < 15) {
      setHand([...hand, ...drawCards(3)]);
    }
  }

  function toggleCardSelection(index: number) {
    if (selectedCards.length === 3 && !hand[index].selected) {
      return;
    }
    setHand(
      hand.map((card, i) =>
        i === index ? { ...card, selected: !card.selected } : card
      )
    );
  }

  function handleCardClick(index: number) {
    toggleCardSelection(index);
  }

  const selectedCards = hand.filter((card) => card.selected);

  const handleSetSelection = () => {
    if (selectedCards.length !== 3) return;
    if (checkForSet(selectedCards)) {
      if (hand.length === 15) {
        removeSelectedCardsFromHand();
      } else if (hand.length === 12 && deck.length > 0) {
        replaceSelectedCardsInHand(selectedCards);
        setFoundSets([...foundSets, selectedCards]);
      }
    }
  };

  function removeSelectedCardsFromHand() {
    const newHand = hand.filter((card) => !card.selected);
    setHand(newHand);
  }

  function replaceSelectedCardsInHand(selectedCards: LiveCardProps[]) {
    const selectedCardIndices = selectedCards.map((card) => hand.indexOf(card));
    const cardsToDraw = Math.min(deck.length, 3);
    const newCards = drawCards(cardsToDraw);
    replaceCardsAfterSet(selectedCardIndices, newCards);
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

  handleSetSelection();

  return (
    <div className="game">
      <h1>Set Card Game</h1>
      <SetHand hand={hand} onCardClick={handleCardClick} />
      <button onClick={addCards}>Add 3 Cards</button>
      {/* <FoundSets foundSets={foundSets} /> */}
    </div>
  );
};
