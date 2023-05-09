import { useEffect } from "react";
import Flashcards from "./Flashcards";

function App() {
  useEffect(() => {}, []);

  const vocabulary = [
    { word: "Aaaa", definition: "Aa aa aa" },
    { word: "Bbbb", definition: "Bb bb bb" },
    { word: "Cccc", definition: "Cc cc cc" },
  ];

  return (
    <div>
      <header>Vocabulary memorization</header>
      <Flashcards vocabulary={vocabulary} />
    </div>
  );
}

export default App;
