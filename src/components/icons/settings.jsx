import React from "react";
import icon4 from "../../assets/icons/settings.svg";

export default function Setting({ openSetting }) {
  return (
    <div className="icons">
      <button id="settings" className="btn" onClick={openSetting}>
        <img src={icon4} height="30" />
      </button>
    </div>
  );
}
