import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

const Flashcards = ({ vocabulary }) => {
  const [filteredVocabulary, setFilteredVocabulary] = useState([]);
  const [learnedWords, setLearnedWords] = useState([]);
  const [shuffledVocabulary, setShuffledVocabulary] = useState([]);
  const [quizMode, setQuizMode] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);

  const wordsInQuiz = 10;
  const filterOutLearnedWords = true;

  useEffect(() => {
    const storedLearnedWords = localStorage.getItem("learnedWords");

    if (storedLearnedWords) {
      const savedLearnedWords = JSON.parse(storedLearnedWords);
      setLearnedWords(savedLearnedWords);

      if (filterOutLearnedWords) {
        const setToFilterOut = new Set(savedLearnedWords);
        setFilteredVocabulary(
          vocabulary.filter((obj) => !setToFilterOut.has(obj.word))
        );
      } else {
        setFilteredVocabulary(vocabulary);
      }
    } else {
      setFilteredVocabulary(vocabulary);
    }
  }, [vocabulary]);

  useEffect(() => {
    setShuffledVocabulary(shuffleArray(filteredVocabulary));
  }, [vocabulary, filteredVocabulary]);

  useEffect(() => {
    if (quizMode) {
      const correctWord = shuffledVocabulary[currentWordIndex];
      const incorrectWords = shuffleArray(
        filteredVocabulary.filter((item) => item.word !== correctWord.word)
      ).slice(0, 3);
      setChoices(shuffleArray([correctWord, ...incorrectWords]));
    }
  }, [quizMode, currentWordIndex]);

  const handleLearnWord = (word) => {
    const newLearnedWords = [...learnedWords, word];
    setLearnedWords(newLearnedWords);
    console.log("Learned words: ", newLearnedWords.length);
    localStorage.setItem("learnedWords", JSON.stringify(newLearnedWords));
  };

  const handleStartQuiz = () => {
    setQuizMode(true);
    setCurrentWordIndex(0);
    setScore(0);
  };

  const handleAnswer = (word) => {
    if (word === shuffledVocabulary[currentWordIndex].word) {
      setScore(score + 1);
    }
    setCurrentWordIndex(currentWordIndex + 1);
  };

  if (quizMode) {
    if (currentWordIndex >= wordsInQuiz) {
      return (
        <div>
          <div>Quiz complete!</div>
          <div>
            You scored {score} out of {wordsInQuiz}.
          </div>
          <button onClick={() => setQuizMode(false)}>Exit quiz</button>
        </div>
      );
    }

    return (
      <div>
        <div>Score: {score}</div>
        <Flashcard
          word={shuffledVocabulary[currentWordIndex].word}
          definition={shuffledVocabulary[currentWordIndex].definition}
          showDefinition
        />
        <ul>
          {choices.map((item) => (
            <li key={item.word} onClick={() => handleAnswer(item.word)}>
              {item.word}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleStartQuiz}>Start quiz</button>
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
