import { useState, useEffect } from "react";
import Flashcards from "./Flashcards";
import vocabularyData from "./vocabulary.json";

function App() {
  const [vocabulary, setVocabulary] = useState([]);

  useEffect(() => {
    setVocabulary([
      { word: "Aaaa", definition: "Aa aa aa" },
      { word: "Bbbb", definition: "Bb bb bb" },
      { word: "Cccc", definition: "Cc cc cc" },
    ]);
  }, []);

  return (
    <div>
      <header>Vocabulary memorization</header>
      <Flashcards vocabulary={vocabulary} />
    </div>
  );
}

export default App;
