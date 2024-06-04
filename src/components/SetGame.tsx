import React, { useState } from "react";
import { LiveCardProps } from "./interfaces";
import getStartingDeck from "./SetDeck";
import SetHand from "./SetHand";

export const SetGame: React.FC = () => {
  var deck = getStartingDeck();

  function drawCards(count: number): LiveCardProps[] {
    const cards = deck.slice(0, count);
    deck = deck.slice(count);
    return cards;
  }

  const [hand, setHand] = useState(drawCards(12));

  function addCards() {
    if (deck.length === 0 || hand.length === 15) {
      return;
    }
    if (deck.length <= 3) {
      setHand([...hand, ...drawCards(deck.length)]);
      return;
    }
    setHand([...hand, ...drawCards(3)]);
    return;
  }

  function handleCardClick(index: number) {
    const cardCopy: LiveCardProps = Object.assign(hand[index], {
      selected: !hand[index].selected,
    });
    if (selectedCards.length === 3 && cardCopy.selected) {
      cardCopy.selected = false;
      return;
    }
    const handCopy = hand.slice();
    handCopy[index] = cardCopy;
    setHand(handCopy);
  }

  var selectedCards = hand.filter((card) => card.selected);

  // useEffect(() => {
    if (selectedCards.length === 3) {
      const foundSet = checkForSet(selectedCards);
      if (foundSet) {
        console.log("Found a set!");
        const handWithSetRemoved = hand.filter((card) => !card.selected)
        setHand(handWithSetRemoved);
        addCards();
        console.log(deck)
      } else {
        console.log("Not a set.")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedCards]);

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
      <SetHand hand={hand} onCardClick={handleCardClick}/>
      <button onClick={addCards}>Add 3 Cards</button>
    </div>
  );
}