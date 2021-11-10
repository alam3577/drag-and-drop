import React from "react";
import ZoomIn from "../../assets/icons/zoom-in.svg";

export default function ZoomInIcon({ zoomIn }) {
  return (
    <div className="icons">
      <button id="add-item" className="btn" onClick={zoomIn}>
        <img src={ZoomIn} height="40" />
      </button>
    </div>
  );
}
