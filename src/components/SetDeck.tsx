import {
  SetCardProps,
  SetCardColor,
  SetCardFill,
  SetCardNumber,
  SetCardShape,
} from "./interfaces";

const SetCardNumbers: SetCardNumber[] = [1, 2, 3];
const SetCardShapes: SetCardShape[] = ["oval", "squiggle", "diamond"];
const SetCardColors: SetCardColor[] = ["red", "green", "purple"];
const SetCardFills: SetCardFill[] = ["striped", "solid", "empty"];

function makeDeck(): SetCardProps[] {
  const deck: SetCardProps[] = [];
  for (const number of SetCardNumbers) {
    for (const shape of SetCardShapes) {
      for (const color of SetCardColors) {
        for (const fill of SetCardFills) {
          deck.push({ number, shape, color, fill });
        }
      }
    }
  }
  return deck;
}

function shuffleDeck(deck: SetCardProps[]): SetCardProps[] {
  const shuffledDeck = deck.slice();
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}

export function getStartingDeck(): SetCardProps[] {
  const deck = makeDeck();
  const shuffledDeck = shuffleDeck(deck);
  return shuffledDeck;
}