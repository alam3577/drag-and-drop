import React from "react";
import ZoomOut from "../../assets/icons/zoom-out.svg";

export default function ZoomOuticon({ zoomOut }) {
  return (
    <div className="icons">
      <button id="add-item" className="btn" onClick={zoomOut}>
        <img src={ZoomOut} height="40" />
      </button>
    </div>
  );
}
