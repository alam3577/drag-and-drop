import React from "react";
import { useHistory } from "react-router-dom";
export default function MainBtn({ id }) {
  const history = useHistory();
  return (
    <div className="main-btns">
      <button
        className="big-btn"
        onClick={() => history.push(`/mainPlate/${id}`)}
      >
        <div className="inner-btn">Select</div>
      </button>
    </div>
  );
}
