import React, { useRef } from "react";
// import Full from "../assets/img/charcuterie-maker.png";
import SelectBtn from "../components/mainBtnSelect";
import BackBtn from "../components/icons/backArrow";
import Help from "../components/icons/help";
import CloseBtn from "../assets/icons/close-btn-inner.svg";

import { data } from "./Boards";
import { NavLink } from "react-router-dom";

export default function SelectPlate() {
  const [HelpModelOpen, setHelpModelOpen] = React.useState(false);
  const myRef = useRef();
  function openHelpModal() {
    setHelpModelOpen(true);
  }
  function closeHelpModal() {
    setHelpModelOpen(false);
  }
  // slider func
  let [counter, setCounter] = React.useState(1);
  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(data.length);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      //   setCounter(counter + 1);
      if (data.length === counter) {
        setCounter(1);
      } else {
        setCounter(counter + 1);
      }
    }
  };

  const SelectPlate = () => {
    console.log("skdhfg");
    // history.push(`/mainPlate/${data[counter - 1].id}`);
  };

  return (
    <>
      <div className="SelectScreen page-animate">
        <div className="iconButton">
          <BackBtn />
          <Help openHelpModal={openHelpModal} />
        </div>
        <p className="choose">Choose your Board:</p>
        <div className="selectSlider">
          <button
            className="previous"
            onClick={() => {
              onButtonClick("prev");
            }}
          >
            Prev
          </button>
          {
            <NavLink
              to={`/mainPlate/${data[counter - 1].id}`}
              style={{ textDecoration: "none" }}
            >
              <div ref={myRef}>
                <img
                  src={data[counter - 1].img2}
                  alt="emptyplate1"
                  className={`plate1 ${
                    data[counter - 1].id === 3 ? "plate3" : ""
                  }`}
                  width="100%"
                />
                <h4>{data[counter - 1].name}</h4>
                <p>({data[counter - 1].dimension})</p>
              </div>
            </NavLink>
          }
          {/* <h1>{JSON.stringify(data[counter - 1])}</h1> */}
          <button
            className="next"
            onClick={() => {
              onButtonClick("next");
            }}
          >
            Next
          </button>
        </div>

        <SelectBtn id={counter} />
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
            onClick={closeHelpModal}
          >
            <img src={CloseBtn} height="38" />
          </button>

          <div className="box-inner">
            {/* <h3>Watch a Quick Tutorial</h3>
            <div className="videoHelp">
              <Player>
                <source src={DemoVideo} />
              </Player>
            </div> */}
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
              <a target="_blank" href="https://forms.gle/HF12Fb3MPMGEfp3F9">
                Give Feedback
              </a>
              <p>A project by Michael Dutkee</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
