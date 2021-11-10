import React from "react";
import icon3 from "../../assets/icons/duplicate.svg";

export default function Duplicate({ duplicateItem, selectedItem }) {
  const onDuplicate = (e) => {
    if (selectedItem) {
      duplicateItem(e);
    }
  };

  return (
    <div className="icons">
      <button id="layer-lower" className="duplicate-btn" onClick={onDuplicate}>
        <img src={icon3} height="34" />
      </button>
    </div>
  );
}
