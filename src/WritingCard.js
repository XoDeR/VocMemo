import React, { useState } from "react";
import "./writingcard.css";

function WritingCard({ title, task, texts }) {
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    setShowText(!showText);
  };

  return (
    <div
      className="writingcard"
      onClick={handleClick}
      style={{ display: "flex" }}
    >
      {showText ? (
        <div>
          <h4>{title}</h4>
          <div>{task.join(" ")}</div>
        </div>
      ) : (
        <div>{texts[0].join(" ")}</div>
      )}
    </div>
  );
}

export default WritingCard;
