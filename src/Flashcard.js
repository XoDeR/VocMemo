import React, { useState } from "react";

const Flashcard = ({ word, definition }) => {
  const [showDefinition, setShowDefinition] = useState(false);

  const handleClick = () => {
    setShowDefinition(!showDefinition);
  };

  return <div onClick={handleClick}>{showDefinition ? definition : word}</div>;
};

export default Flashcard;
