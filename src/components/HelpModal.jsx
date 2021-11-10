import React from "react";
import CloseBtn from "../assets/icons/close-btn-inner.svg";
import HelpImg from "../assets/img/charcuterie-maker.png";
// import Modal from "react-modal";
import Modal from "react-bootstrap/Modal";
import DemoVideo from "../assets/video/Splendidboard_Demo_02.mp4";
import { Player, BigPlayButton } from "video-react";
import "../../node_modules/video-react/dist/video-react.css";
import "../assets/style/HelpModal.css";
import { Link } from "react-router-dom";

export default function HelpModal({ HelpModelOpen, closeModal }) {
  return (
    <>
      <div>
        <div
          className={`box help-section help-menu-box ${
            HelpModelOpen ? "hl-box " : ""
          }`}
          style={{ height: "600px", maxWidth: "380px" }}
        >
          <span className="title">Help:</span>
          <button
            className="btn-inner"
            id="close-btn-inner"
            onClick={closeModal}
          >
            <img src={CloseBtn} height="38" />
          </button>

          <div className="box-inner">
            <h3>Watch a Quick Tutorial</h3>
            <div className="videoHelp">
              <Player>
                <source src={DemoVideo} />
              </Player>
            </div>
            <div className="listHelp">
              <h4>Instructions:</h4>
              <ol>
                <li> Choose your Board</li>
                <li> Click the button to open food options</li>
                <li>Press and drag the food items on to the board.</li>
                <li>
                  To place food in front or behind, use the buttons while
                  selected.
                </li>
                <li>To delete items, press the while selected </li>
                <li>
                  To access options like save, clear board, and restart, click
                  the button
                </li>
              </ol>
            </div>
            <div className="credits">
              <h2>Questions and Comments?</h2>
              <Link href="https://forms.gle/HF12Fb3MPMGEfp3F9" target="_blank">
                Give Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal
        show={HelpModelOpen}
        onHide={closeModal}
        animation={false}
        className="HelpOuter"
      >
        <Modal.Body>
          <div
            className={`box help-section help-menu-box ${
              HelpModelOpen ? "hl-box " : ""
            }`}
            style={{ height: "600px", maxWidth: "380px" }}
          >
            <span className="title">Help:</span>
            <button
              className="btn-inner"
              id="close-btn-inner"
              onClick={closeModal}
            >
              <img src={CloseBtn} height="38" />
            </button>

            <div className="box-inner">
              <h3>Watch a Quick Tutorial</h3>
              <div className="videoHelp">
                <Player>
                  <source src={DemoVideo} />
                </Player>
              </div>
              <div className="listHelp">
                <h4>Instructions:</h4>
                <ol>
                  <li> Choose your Board</li>
                  <li> Click the button to open food options</li>
                  <li>Press and drag the food items on to the board.</li>
                  <li>
                    To place food in front or behind, use the buttons while
                    selected.
                  </li>
                  <li>To delete items, press the while selected </li>
                  <li>
                    To access options like save, clear board, and restart, click
                    the button
                  </li>
                </ol>
              </div>
              <div className="credits">
                <h2>Questions and Comments?</h2>
                <h3>hello@splendidboard.com</h3>
                <p>A project by Michael Dutkee</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  );
}
