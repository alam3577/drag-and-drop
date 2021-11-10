import React from "react";
import icon6 from "../../assets/icons/help.svg";

export default function HelpIcon({ openHelpModal }) {
  return (
    <div className="icons">
      <button id="help" className="btn circle" onClick={openHelpModal}>
        <img src={icon6} height="34" />
      </button>
    </div>
  );
}
