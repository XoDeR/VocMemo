import React, { useState } from "react";
import "./flashcard.css";

const Flashcard = ({ word, definition, learned, onLearn }) => {
  const [showDefinition, setShowDefinition] = useState(false);

  const handleClick = () => {
    setShowDefinition(!showDefinition);
  };

  return (
    <div
      className="flashcard"
      onClick={handleClick}
      style={{ display: "flex" }}
    >
      {showDefinition ? definition : word}
      {learned ? (
        <div style={{ marginLeft: "auto" }}>Learned!</div>
      ) : (
        <button onClick={onLearn} style={{ marginLeft: "auto" }}>
          Learned
        </button>
      )}
    </div>
  );
};

export default Flashcard;
