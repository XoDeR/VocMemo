import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

const Flashcards = ({ vocabulary }) => {
  const [learnedWords, setLearnedWords] = useState([]);
  const [shuffledVocabulary, setShuffledVocabulary] = useState([]);

  useEffect(() => {
    const storedLearnedWords = localStorage.getItem("learnedWords");
    if (storedLearnedWords) {
      setLearnedWords(JSON.parse(storedLearnedWords));
    }
  }, []);

  useEffect(() => {
    setShuffledVocabulary(shuffleArray(vocabulary));
  }, [vocabulary]);

  const handleLearnWord = (word) => {
    const newLearnedWords = [...learnedWords, word];
    setLearnedWords(newLearnedWords);
    localStorage.setItem("learnedWords", JSON.stringify(newLearnedWords));
  };

  return (
    <div>
      {shuffledVocabulary.map((item) => (
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

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default Flashcards;
