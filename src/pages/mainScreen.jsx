import React, { createRef, useEffect } from "react";
import AddItem from "../components/icons/addItem";
import CloseBtn from "../assets/icons/close-btn-inner.svg";
import TrashIcon from "../components/icons/trash";
import { uploadFile } from "react-s3";
import { Link } from "react-router-dom";

// import EmpPlate from "../assets/img/charcuterie-board-crop.png";
import Setting from "../components/icons/settings";
// import LayerLower from "../components/icons/layerLower";
// import LayerRise from "../components/icons/layerRaise";
import HelpIcon from "../components/icons/help";
import ZoomInIcon from "../components/icons/zoomin";
import ZoomOutIcon from "../components/icons/ZoomOut";
import TextBoard from "../components/TextBoard";
import FoodItem from "../components/FoodItems";
import SettingModal from "../components/options";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

import download from "downloadjs";
import Duplicate from "../components/icons/duplicate";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useHistory, useParams } from "react-router-dom";
import FileSaver from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { data } from "./Boards";
// new
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
//
import Checked from "../assets/icons/checked.svg";
gsap.registerPlugin(Draggable);
const customStyles = {
  content: {
    top: "80%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "none",
    border: "none",
  },
};

export default function MainScreen() {
  const [IsOpen, setIsOpen] = React.useState(false);
  const [HelpModelOpen, setHelpModelOpen] = React.useState(false);
  const [settingModal, setSettingModal] = React.useState(false);
  const [openFoodNames, setOpenFoodNames] = React.useState(true);
  const [openFoodItems, setOpenFoodItems] = React.useState(false);
  const [foodItem, setFoodItem] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [checked, setChecked] = React.useState(false);
  const [zIndex, setZIndex] = React.useState("");
  const [showAddItem, setShowAddItem] = React.useState(true);
  const [zoomIndex, setZoomIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const { plateId } = useParams();
  let extractedData = data[plateId - 1];

  const nodeRef = createRef();
  const history = useHistory();
  //open Settings
  function openSetting() {
    setSettingModal(true);
    setIsOpen(false);
    setHelpModelOpen(false);
  }
  //open Help Modal
  function openHelpModal() {
    setHelpModelOpen(true);
    setIsOpen(false);
    setChecked(false);
    setSettingModal(false);
  }
  //  open Modal
  function openModal() {
    setIsOpen(true);
    setOpenFoodNames(true);
  }
  //close Modal
  function closeModal() {
    setIsOpen(false);
    setFoodItem(null);
    setOpenFoodItems(false);
    setHelpModelOpen(false);
    setSettingModal(false);
    setChecked(false);
  }

  //on click food names
  function onClickFoodName(slug) {
    setFoodItem(slug);
    setOpenFoodItems(true);

    setOpenFoodNames(false);
  }
  // back to food names
  function backToFoodNames() {
    setOpenFoodItems(false);
    setOpenFoodNames(true);
  }
  //option back button
  function goBack() {
    setSettingModal(false);
  }

  const config = {
    bucketName: "splendidbucket",
    // dirName: 'media', /* optional */
    region: "us-east-2",
    accessKeyId: "AKIAZETTQHFRFB2X5AEC",
    secretAccessKey: "q8gOEkar8uATdkevAc815fl4G/ffO7StsHAUxhYG",
    // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
  };

  //dataURLtoFile
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  //save plate image
  const createImage = () => {
    setLoading(true);
    let plate = document.querySelector(".EmptyPlate");
    plate.style.transform = "scale(1)";
    plate.style.transition = "none";
    let selected = document.querySelectorAll(".a");
    if (selected.length > 0) {
      selected.forEach((i) => {
        i.classList.remove("cloned-item-clicked", "current-cloned-item");
      });
    }
    // node.clientHeight = 520;
    closeModal();
    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
    // html2canvas(plate, { scale: 2, dpi: 1200 }).then(function (canvas) {
    //   var imgsrc = canvas.toDataURL("image/jpeg");
    //   let imageObj = dataURLtoFile(imgsrc, `myPlate-${Date.now()}.jpeg`);
    //   uploadFile(imageObj, config)
    //     .then((data) => {
    //       setLoading(false);
    //       setChecked(true);

    //       setTimeout(function () {
    //         setChecked(false);
    //       }, 2000);

    //       FileSaver.saveAs(data.location, data.key);
    //     })
    //     .catch((err) => console.error(err));
    // });
  };
  //clear board
  const clearBoard = () => {
    let el = document.querySelectorAll(".highlight");
    el.forEach((element) => element.remove());
    closeModal();
  };
  //startOver
  const startOver = () => {
    let el = document.querySelectorAll(".highlight");
    el.forEach((element) => element.remove());
    history.push("/selectPlate");
  };

  //remove item
  const removeItem = () => {
    console.log(selectedItem);
    if (selectedItem !== null) {
      let el = document.querySelector(`#${selectedItem}`);
      el.remove();
      setSelectedItem(null);
    }
  };

  var rotationDrag;
  var translateDrag;

  function setDraggable(event) {
    let isRotation = this.vars.type === "rotation";
    let isCorner = event.target.dataset.corner;

    if (isCorner || event.ctrlKey) {
      // No need to do this if it's already the rotation draggable
      if (!isRotation) {
        translateDrag.disable();
        rotationDrag.enable().startDrag(event);
      }
    } else if (isRotation) {
      rotationDrag.disable();
      translateDrag.enable().startDrag(event);
    }
  }

  //find Center
  const centerPoint = (e) => {
    var x1;
    var y1;
    var x2;
    var y2;
    var radius;
    let plateData = document.querySelector(".EmptyPlate");
    x1 = plateData.offsetLeft + plateData.clientHeight / 2;
    y1 = plateData.offsetTop + plateData.clientWidth / 2;
    x2 = e.pointerX;
    y2 = e.pointerY;
    if (plateData.style.transform === "scale(1.25)") {
      radius =
        plateData.clientWidth / 2 +
        ((25 / 100) * plateData.clientWidth) / 2 +
        15;
      var dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      return dist > radius ? false : true;
    } else if (plateData.style.transform === "scale(1.5)") {
      radius =
        plateData.clientWidth / 2 +
        ((50 / 100) * plateData.clientWidth) / 2 +
        15;
      var dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      return dist > radius ? false : true;
    } else if (plateData.style.transform === "scale(1.75)") {
      radius =
        plateData.clientWidth / 2 +
        ((75 / 100) * plateData.clientWidth) / 2 +
        15;
      var dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      return dist > radius ? false : true;
    }

    radius = plateData.clientWidth / 2 + 15;
    var dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return dist > radius ? false : true;
  };

  //click item
  const clickItem = (e) => {
    let clickedItems = document.querySelectorAll(".cloned-item-clicked");
    if (clickedItems.length > 0) {
      clickedItems.forEach((item) => {
        item.classList.remove("cloned-item-clicked");
      });
    }
    e.target.classList.add("cloned-item-clicked");
    setSelectedItem(e.target.id);
    // setShowAddItem(!showAddItem);
  };

  useEffect(() => {
    if (selectedItem) {
      let item = document.getElementById(selectedItem);
      rotationDrag = new Draggable(item, {
        type: "rotation",
        throwProps: true,
        onPress: setDraggable,
      }).disable();
      translateDrag = new Draggable(item, {
        bounds: window,
        throwProps: true,
        onPress: setDraggable,
        onClick: function (e) {
          if (e.pointerType === "touch") {
            if (
              this.target.classList.value
                .split(" ")
                .includes("cloned-item-clicked")
            ) {
              this.target.classList.remove("cloned-item-clicked");
              setSelectedItem(null);
            } else {
              clickItem(this);
            }
          }
        },
        onDragEnd: function () {
          if (this.target.parentElement.classList[1] !== "LongBoard") {
            if (!centerPoint(this)) {
              this.target.classList.remove("cloned-item-clicked");
              gsap.timeline().to(this.target, 1, {
                x: 0,
                y: 0,
              });
            }
          } else {
            if (!this.hitTest(`.LongBoard`)) {
              this.target.classList.remove("cloned-item-clicked");
              gsap.timeline().to(this.target, 1, {
                x: 0,
                y: 0,
              });
            }
          }
        },
      });
    }
  }, [selectedItem]);

  const getCoordinates = (target) => {
    let tp = target.style.transform;

    let pointsArray = tp
      .substring(tp.indexOf("(") + 1, tp.indexOf(")"))
      .split(",")
      .map((i) => parseInt(i) + 10);
    let transform = `translate3d(${pointsArray[0]}px, ${
      pointsArray[1]
    }px, 0px ) ${tp.substr(tp.indexOf(")") + 1)}`;
    return transform;
  };

  const duplicateItem = (e) => {
    let target = document.getElementById(selectedItem);

    let plateData = document.querySelector(".EmptyPlate");
    let newElement = target.cloneNode();
    newElement.setAttribute(`id`, `a${uuidv4()}`);
    newElement.style.transform = getCoordinates(newElement);

    let rotatorIcon = document.createElement("span");

    rotatorIcon.classList.add("rotator");
    rotatorIcon.dataset.corner = true;
    newElement.appendChild(rotatorIcon);
    plateData.appendChild(newElement);

    Draggable.create(newElement, {
      type: "x,y",
      bounds: document.querySelector(".MainScreen"),
      onDragStart: function () {
        let items = document.querySelectorAll(".highlight");
        items.forEach((element) => {
          element.classList.remove(
            "cloned-item-clicked",
            "current-cloned-item"
          );
        });
      },
      onDrag: function () {},
      onClick: function () {
        if (
          this.target.classList.value.split(" ").includes("cloned-item-clicked")
        ) {
          this.target.classList.remove("cloned-item-clicked");
          setSelectedItem(null);
        } else {
          clickItem(this);

          setSelectedItem(this.target.id);
        }
      },
      onPress: function () {},
      onDragEnd: function () {
        if (this.target.parentElement.classList[1] !== "LongBoard") {
          if (!centerPoint(this)) {
            this.target.classList.remove("cloned-item-clicked");
            gsap.timeline().to(this.target, 1, {
              x: 0,
              y: 0,
            });
          }
        } else {
          if (!this.hitTest(`.LongBoard`)) {
            this.target.classList.remove("cloned-item-clicked");
            gsap.timeline().to(this.target, 1, {
              x: 0,
              y: 0,
            });
          }
        }
      },
    });
  };

  const zoomIn = () => {
    let plate = document.querySelector(".EmptyPlate");
    if (plate.style.transform === "scale(1)") {
      plate.style.transform = "scale(1.25)";
      plate.style.transition = "0.5s";
    } else if (plate.style.transform === "scale(1.25)") {
      plate.style.transform = "scale(1.5)";
      plate.style.transition = "0.5s";
    } else if (plate.style.transform === "scale(1.5)") {
      plate.style.transform = "scale(1.75)";
      plate.style.transition = "0.5s";
    }
  };

  const zoomOut = () => {
    let plate = document.querySelector(".EmptyPlate");
    if (plate.style.transform === "scale(1.75)") {
      plate.style.transform = "scale(1.5)";
      plate.style.transition = "0.5s";
    } else if (plate.style.transform === "scale(1.5)") {
      plate.style.transform = "scale(1.25)";
      plate.style.transition = "0.5s";
    } else if (plate.style.transform === "scale(1.25)") {
      plate.style.transform = "scale(1)";
      plate.style.transition = "0.5s";
    }
  };

  const boardClick = (e) => {
    let eventClass = e.target.classList.value.split(" ");
    if (
      selectedItem &&
      (eventClass[0] === "plateWapper" || eventClass[0] === "EmptyPlate")
    ) {
      let el = document.querySelector(`#${selectedItem}`);
      el?.classList.remove("cloned-item-clicked");
      setSelectedItem(null);
    }
  };

  return (
    <>
      <div className="MainScreen page-animate">
        <div className="icons-screen">
          <HelpIcon openHelpModal={openHelpModal} />
          <div className="iconButtonupper">
            <Duplicate
              duplicateItem={duplicateItem}
              selectedItem={selectedItem}
            />
            <div className="icon-zoom">
              <ZoomOutIcon zoomOut={zoomOut} />
              <ZoomInIcon zoomIn={zoomIn} />
            </div>
          </div>
        </div>
        <div className="plateWapper" onClick={(e) => boardClick(e)}>
          <div ref={nodeRef} id="plateImage">
            <div
              className={`EmptyPlate ${extractedData.className}`}
              style={{
                background: `url(${extractedData.img})`,
                backgroundRepeat: `${extractedData.backgroundRepeat}`,
                backgroundSize: `${extractedData.backgroundSize}`,
                height: `${extractedData.height}`,
                width: `${extractedData.width}`,
                position: `${extractedData.position}`,
                backgroundSize: `${extractedData.backgroundSize}`,
                boxShadow: `${extractedData.boxShadow}`,
                borderRadius: `${extractedData.borderRadius}`,
                transform: "scale(1)",
              }}
              onClick={(e) => boardClick(e)}
            ></div>
          </div>
        </div>
        <div
          className="check"
          style={{ display: checked ? "block" : "none", zIndex: 999999 }}
        >
          <span>
            <img src={Checked} alt="checked" />
          </span>
        </div>
        {loading && <div className="loader"></div>}

        <div className="BottomIcons">
          <div className="iconButtonlower">
            <Setting openSetting={openSetting} />
            {showAddItem && <AddItem clickAddItem={openModal} />}

            <TrashIcon removeItem={removeItem} />
          </div>

          <div>
            <div
              className={`product-box ${IsOpen ? "show-box" : ""}`}
              style={{ height: "350px", maxWidth: "393px" }}
            >
              {openFoodNames && (
                <TextBoard
                  onClickFoodName={onClickFoodName}
                  closeModal={closeModal}
                  IsOpen={IsOpen}
                />
              )}
              {openFoodItems && (
                <FoodItem
                  closeModal={closeModal}
                  foodItem={foodItem}
                  backToFoodNames={backToFoodNames}
                  IsOpen={IsOpen}
                  setIsOpen={setIsOpen}
                  setFoodItem={setFoodItem}
                  onClickFoodName={onClickFoodName}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                  centerPoint={centerPoint}
                  clickItem={clickItem}
                  // zIndex={zIndex}
                  // setZIndex={setZIndex}
                />
              )}
            </div>
          </div>
          <div>
            {/* {HelpModelOpen ? ( */}
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
                      To access options like save, clear board, and restart,
                      click the button
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
            {/* ) : null} */}

            <SettingModal
              goBack={goBack}
              createImage={createImage}
              isOpen={settingModal}
              customStyles={customStyles}
              clearBoard={clearBoard}
              closeModal={closeModal}
              startOver={startOver}
            />
          </div>
        </div>
      </div>
    </>
  );
}
