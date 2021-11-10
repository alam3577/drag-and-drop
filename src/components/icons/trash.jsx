import React from "react";
import icon5 from "../../assets/icons/trash.svg";

export default function TrashIcon({ removeItem }) {
  return (
    <div className="icons">
      <button id="trash" className="btn trash" onClick={removeItem}>
        <img src={icon5} height="30" alt={"trash"} />
      </button>
    </div>
  );
}
