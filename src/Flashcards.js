import React from "react";
import Flashcard from "./Flashcard";

const Flashcards = ({ vocabulary }) => {
  return (
    <div>
      {vocabulary.map((item) => (
        <Flashcard
          key={item.word}
          word={item.word}
          definition={item.definition}
        />
      ))}
    </div>
  );
};

export default Flashcards;
