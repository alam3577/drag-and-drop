import React from "react";
import icon3 from "../../assets/icons/layer_lower.svg";

export default function LayerLower({ rotateItem }) {
  return (
    <div className="icons">
      <button id="layer-lower" className="btn" onClick={rotateItem}>
        <img src={icon3} height="34" />
      </button>
    </div>
  );
}
