import React from "react";
import WritingCard from "./WritingCard";

const Writing = ({ writingList }) => {
  return (
    <div>
      {writingList.map((item) => (
        <WritingCard title={item.title} task={item.task} texts={item.texts} />
      ))}
    </div>
  );
};

export default Writing;
