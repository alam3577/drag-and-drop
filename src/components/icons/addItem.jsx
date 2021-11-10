import React from "react";
import icon1 from "../../assets/icons/add-item.svg";

export default function AddItem({ clickAddItem }) {
  return (
    <div className="icons">
      <button id="add-item" className="btn circle add" onClick={clickAddItem}>
        <img src={icon1} height="40" />
      </button>
    </div>
  );
}
