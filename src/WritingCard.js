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
          <div style={{ textAlign: "left" }}>
            {task.map((line) => (
              <span>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "left" }}>
          {texts[0].map((line) => (
            <span>
              {line}
              <br />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default WritingCard;
