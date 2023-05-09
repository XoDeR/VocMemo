import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

const Flashcards = ({ vocabulary }) => {
  const [learnedWords, setLearnedWords] = useState([]);

  useEffect(() => {
    const storedLearnedWords = localStorage.getItem("learnedWords");
    if (storedLearnedWords) {
      setLearnedWords(JSON.parse(storedLearnedWords));
    }
  }, []);

  const handleLearnWord = (word) => {
    const newLearnedWords = [...learnedWords, word];
    setLearnedWords(newLearnedWords);
    localStorage.setItem("learnedWords", JSON.stringify(newLearnedWords));
  };

  return (
    <div>
      {vocabulary.map((item) => (
        <Flashcard
          key={item.word}
          word={item.word}
          definition={item.definition}
          learned={learnedWords.includes(item.word)}
          onLearn={() => handleLearnWord(item.word)}
        />
      ))}
    </div>
  );
};

export default Flashcards;
