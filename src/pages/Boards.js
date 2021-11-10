import EmpPlate from "../assets/img/charcuterie-board-crop.png";
import LongBoard from "../assets/img/long.png";
import EmptyBoard from "../assets/img/charcuterie-board-long.png";
import MappleBoard from "../assets/img/NewBoard.png";
import MappleBoardSlide from "../assets/img/mappleBoard.png";

export let data = [
  {
    id: 1,
    img: EmpPlate,
    img2: EmpPlate,

    className: "CircularPlate",
    name: "Classic Mapac 1",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    dimension: "26” x 26”",
    height: "33vw",
    width: "33vw",
    borderRadius: "34vw",
    position: "relative",
    backgroundSize: "100%",
  },
  {
    id: 2,
    img: EmptyBoard,
    img2: LongBoard,
    className: "LongBoard",
    name: "Classic Mapac 2",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "33vw",
    dimension: "26” x 40”",
    width: "33vw",
    position: "relative",
    backgroundSize: "100%",
    transform: "",
    boxShadow: "none",
    borderRadius: "",
  },
  {
    id: 3,
    img: MappleBoard,
    img2: MappleBoardSlide,
    className: "MappleBoard",
    name: "Classic Mapac 3",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "33vw",
    width: "33vw",
    dimension: "26” x 50”",
    position: "relative",
    backgroundSize: "100%",
    transform: "",
    boxShadow: "none",
    borderRadius: "",
  },
];
