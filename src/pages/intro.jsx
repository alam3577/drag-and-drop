import React from "react";
import Full from "../assets/img/charcuterie-maker.png";
import StartBtn from "../components/mainBtn";
import logo from "../assets/img/splendidboard_logo.svg";

export default function Intro() {
  return (
    <>
      <div className="introScreen page-animate">
        <img className="fullPlate" alt="full-plate" src={Full} />
        <img src={logo} alt="splendid_board" className="splendid-logo" />
        <p>Drag and drop to design your next charcuterie creation!</p>
        <StartBtn />
      </div>
    </>
  );
}
