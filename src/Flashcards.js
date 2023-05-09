import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

const Flashcards = ({ vocabulary }) => {
  const [learnedWords, setLearnedWords] = useState([]);
  const [shuffledVocabulary, setShuffledVocabulary] = useState([]);
  const [quizMode, setQuizMode] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedLearnedWords = localStorage.getItem("learnedWords");
    if (storedLearnedWords) {
      setLearnedWords(JSON.parse(storedLearnedWords));
    }
  }, []);

  useEffect(() => {
    setShuffledVocabulary(shuffleArray(vocabulary));
  }, [vocabulary]);

  useEffect(() => {
    if (quizMode) {
      const correctWord = shuffledVocabulary[currentWordIndex];
      const incorrectWords = shuffleArray(
        vocabulary.filter((item) => item.word !== correctWord.word)
      ).slice(0, 3);
      setChoices(shuffleArray([correctWord, ...incorrectWords]));
    }
  }, [quizMode, currentWordIndex]);

  const handleLearnWord = (word) => {
    const newLearnedWords = [...learnedWords, word];
    setLearnedWords(newLearnedWords);
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
    if (currentWordIndex >= vocabulary.length) {
      return (
        <div>
          <div>Quiz complete!</div>
          <div>
            You scored {score} out of {vocabulary.length}.
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
