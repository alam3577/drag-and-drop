import React from "react";
import { useHistory } from "react-router-dom";

export default function MainBtn() {
  const history = useHistory();
  return (
    <div className="main-btns">
      <button className="big-btn" onClick={() => history.push("/selectPlate")}>
        <div className="inner-btn">Start</div>
      </button>
    </div>
  );
}
