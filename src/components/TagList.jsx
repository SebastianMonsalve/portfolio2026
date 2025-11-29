import React from "react";

const TagList = ({
  items = [],
  wrapperClass = "",
  itemClass = "",
  bgClass = "",
  textClass = "",
  hoverClass = "",
}) => {
  return (
    <div className={wrapperClass}>
      {items.map((item, i) => (
        <span
          key={i}
          className={`relative rounded-lg overflow-hidden ${itemClass} ${hoverClass}`}
        >
          {bgClass && <div className={`absolute inset-0 ${bgClass}`} />}
          <p className={`relative z-10 ${textClass}`}>{item}</p>
        </span>
      ))}
    </div>
  );
};

export default TagList;
