import { useState, useEffect } from "react";
import Flashcards from "./Flashcards";
import vocabularyData from "./vocabulary.json";

function App() {
  const [vocabulary, setVocabulary] = useState([]);

  useEffect(() => {
    let tempVocabulary = [];
    for (const [key, value] of Object.entries(vocabularyData)) {
      let definition = "";
      if (Array.isArray(value)) {
        definition = value.join(", ");
      } else {
        definition = value;
      }

      tempVocabulary.push({ word: key, definition: definition });
    }
    console.log(tempVocabulary);

    setVocabulary(tempVocabulary);
    // setVocabulary([
    //   { word: "Aaaa", definition: "Aa aa aa" },
    //   { word: "Bbbb", definition: "Bb bb bb" },
    //   { word: "Cccc", definition: "Cc cc cc" },
    // ]);
  }, []);

  return (
    <div>
      <header>Vocabulary memorization</header>
      <Flashcards vocabulary={vocabulary} />
    </div>
  );
}

export default App;
