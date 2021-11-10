import React from "react";
import icon7 from "../../assets/icons/back-arrow.svg";
import { useHistory } from "react-router-dom";

export default function BackArrow() {
  const history = useHistory();
  return (
    <div className="icons">
      <button
        id="back-arrow"
        className="btn circle"
        onClick={() => history.push("/")}
      >
        <img src={icon7} height="34" />
      </button>
    </div>
  );
}
