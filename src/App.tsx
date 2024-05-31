import './App.css';
import SetCard from './components/SetCard';
import SetCardDeck from './components/SetCardDeck';

function App() {
  
  const deck = SetCardDeck();
  console.log(deck);
  
  return (
    <SetCard color={"green"} number={2} shape={"squiggle"} fill={"striped"} />
  );
}

export default App;
