import React from "react";
import icon1 from "../assets/icons/add-item.svg";
import icon2 from "../assets/icons/layer_raise.svg";
import icon3 from "../assets/icons/layer_lower.svg";
import icon4 from "../assets/icons/settings.svg";
import icon5 from "../assets/icons/trash.svg";
import icon6 from "../assets/icons/help.svg";
import icon7 from "../assets/icons/back-arrow.svg";

export default function IconSection() {
  return (
    <div className="icons">
      <button id="add-item" className="btn circle add">
        <img src={icon1} height="40" />
      </button>
      <button id="layer-raise" className="btn">
        <img src={icon2} height="34" />
      </button>
      <button id="layer-lower" className="btn">
        <img src={icon3} height="34" />
      </button>
      <button id="settings" className="btn">
        <img src={icon4} height="30" />
      </button>
      <button id="trash" className="btn">
        <img src={icon5} height="30" />
      </button>
      <button id="help" className="btn circle">
        <img className="help" src={icon6} height="46" />
      </button>
      <button id="back-arrow" className="btn circle">
        <img src={icon7} height="20" />
      </button>
    </div>
  );
}
