import React, { useState } from "react";
import "./flashcard.css";

const Flashcard = ({ word, definition }) => {
  const [showDefinition, setShowDefinition] = useState(false);

  const handleClick = () => {
    setShowDefinition(!showDefinition);
  };

  return (
    <div className="flashcard" onClick={handleClick}>
      {showDefinition ? definition : word}
    </div>
  );
};

export default Flashcard;
