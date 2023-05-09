import React, { useState } from "react";
import "./flashcard.css";

const Flashcard = ({ word, definition, learned, onLearn }) => {
  const [showDefinition, setShowDefinition] = useState(false);

  const handleClick = () => {
    setShowDefinition(!showDefinition);
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      {showDefinition ? definition : word}
      {learned ? (
        <div>Learned!</div>
      ) : (
        <button onClick={onLearn}>Learned</button>
      )}
    </div>
  );
};

export default Flashcard;
