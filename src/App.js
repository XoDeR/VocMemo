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

  const handleSaveProgress = () => {
    const learnedWords = localStorage.getItem("learnedWords");
    const blob = new Blob([learnedWords], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "learnedWords.json";
    link.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("learnedWords", reader.result);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <button onClick={handleSaveProgress}>Save Progress</button>
      <input type="file" onChange={handleFileChange} />
      <header>Vocabulary memorization</header>
      <Flashcards vocabulary={vocabulary} />
    </div>
  );
}

export default App;
