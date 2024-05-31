import { useEffect, useState } from "react";
import SetCard from "./SetCard";
import { getStartingDeck } from "./SetDeck";
import { SetCardProps } from "./interfaces";

function SetGame() {
  var deck = getStartingDeck();

  function drawCards(count: number): SetCardProps[] {
    const cards = deck.slice(0, count);
    const newDeck = deck.slice(count);
    deck = newDeck;
    return cards;
  }

  const [hand, setHand] = useState(drawCards(12));

  function fillHand() {
    if (hand.length >= 12) {
      return;
    }
    if (deck.length === 0) {
      return;
    }
    const cardsNeeded = 12 - hand.length;
    if (deck.length < cardsNeeded) {
      setHand([...hand, ...drawCards(deck.length)]);
      return;
    }
    setHand([...hand, ...drawCards(cardsNeeded)]);
    return;
  }

  function addThreeCards() {
    if (deck.length === 0 || hand.length === 15) {
      return;
    }
    if (hand.length > 12) {
      setHand([...hand, ...drawCards(15 - hand.length)]);
      return;
    }
    if (deck.length <= 3) {
      setHand([...hand, ...drawCards(deck.length)]);
      return;
    }
    setHand([...hand, ...drawCards(3)]);
    return;
  }

  return (
    <div className="game">
      <h1>Set Card Game</h1>
      <div className="playingCardDeck">
        {hand.map((card, index) => (
          <SetCard key={index} {...card} />
        ))}
      </div>
      <button onClick={fillHand}>Fill Hand</button>
      <button onClick={addThreeCards}>Add 3 Cards</button>
    </div>
  );
}

export default SetGame;
