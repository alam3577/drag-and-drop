import React from "react";
import icon7 from "../../assets/icons/back-arrow-inner.svg";
import { useHistory } from "react-router-dom";

export default function BackArrow({ clickHandle }) {
  const history = useHistory();
  return (
    <div className="icons">
      <button
        id="back-arrow-inner"
        className="btn-inner"
        onClick={() => clickHandle()}
      >
        <img src={icon7} height="24" />
      </button>
    </div>
  );
}
