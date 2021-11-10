import React from "react";
import CloseBtn from "../assets/icons/close-btn-inner.svg";
import BackArrowInner from "./icons/backArrowInner";
import Modal from "react-bootstrap/Modal";

export default function Options({
  goBack,
  createImage,
  closeModal,
  isOpen,
  clearBoard,
  startOver,
  customStyles,
}) {
  return (
    <div className="ui-example">
      <div
        className={`box ${isOpen ? "c-box" : ""}`}
        style={{ height: "480px", maxWidth: "393px", width: "100%" }}
      >
        <span className="title">Options:</span>
        <BackArrowInner clickHandle={goBack} />
        <button className="btn-inner" id="close-btn-inner" onClick={closeModal}>
          <img src={CloseBtn} height="38" />
        </button>

        <div className="box-inner">
          <button className="menu-btn" onClick={createImage}>
            Download Image
          </button>
          <button className="menu-btn" onClick={clearBoard}>
            Clear the Board
          </button>
          <button className="menu-btn" onClick={startOver}>
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
