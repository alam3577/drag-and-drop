import React, { useEffect, useState } from "react";
import CloseBtn from "../assets/icons/close-btn-inner.svg";
import foodData from "../foodData";
import BackArrowInner from "./icons/backArrowInner";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

import { v4 as uuidv4 } from "uuid";
gsap.registerPlugin(Draggable);
// import rotator from "../assets/icons/rotator.png";

export default function FoodItems({
  closeModal,
  foodItem,
  backToFoodNames,
  onClickFoodName,
  setSelectedItem,
  selectedItem,
  centerPoint,
  clickItem,
}) {
  let itemSelected;
  const [initialXY, setInitialXY] = useState({});

  const onPressBackToFoodNames = () => {
    backToFoodNames();
  };

  const onCloseModal = () => {
    closeModal();
  };

  //first clone

  // function onMousemove(e) {
  //   return {
  //     x: e.pageX - parseFloat(e.target.style.width) / 2,
  //     y: e.pagey - parseFloat(e.target.style.height) / 2,
  //   };

  // }

  const firstClone = (e, ee) => {
    var currentX;
    var currentY;
    let plateData = document.querySelector(".EmptyPlate");
    let target = e.target;

    let transform = plateData.style.transform;
    let scale = transform.substring(
      transform.indexOf("(") + 1,
      transform.indexOf(")")
    );
    currentX =
      (e.pointerX - plateData.offsetLeft - plateData.clientWidth / 2) /
      parseFloat(scale);
    currentY =
      (e.pointerY - plateData.offsetTop - plateData.clientHeight / 2) /
      parseFloat(scale);

    let newElement = target.cloneNode();
    newElement.classList.add("cloned-item", "cloned-item-clicked");

    newElement.style = e.target.style.cssText;
    newElement.style.transform = `translate3d(${currentX}px, ${currentY}px, 0 ) `;
    newElement.style.transitionTimingFunction =
      "cubic-bezier(0.25, 0.1, 0.25, 1)";

    newElement.setAttribute(`id`, `a${uuidv4()}`);
    newElement.classList.add("highlight");

    newElement.classList.remove("first-clone");

    let rotatorIcon = document.createElement("span");

    rotatorIcon.classList.add("rotator");
    rotatorIcon.dataset.corner = true;
    newElement.appendChild(rotatorIcon);
    document.querySelector(".EmptyPlate").appendChild(newElement);

    let clickedItems = document.querySelectorAll(".cloned-item-clicked");
    if (clickedItems.length > 0) {
      clickedItems.forEach((item) => {
        item.classList.remove("cloned-item-clicked");
      });
    }

    createFirstDraggable(newElement);
  };

  // // create dragable
  var createFirstDraggable = (newElement) => {
    new Draggable.create(newElement, {
      type: "x,y",
      bounds: document.querySelector(".MainScreen"),
      onPress: function (e) {},

      onClick: function (e) {
        if (e.target.classList[0] === "food-items") {
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

      onDragStart: function (e) {
        this.target.classList.remove("cloned-item-clicked");

        let clickedItems = document.querySelectorAll(".highlight");
        if (clickedItems.length > 0) {
          clickedItems.forEach((item) => {
            item.classList.remove("cloned-item-clicked", "current-cloned-item");
          });
        }
      },

      onDragEnd: function (e) {
        console.log("shddfhs");
        if (this.target.parentElement.classList[1] === "CircularPlate") {
          if (!centerPoint(this)) {
            this.target.classList.remove("cloned-item-clicked");
            gsap.timeline().to(this.target, 1, {
              x: 0,
              y: 0,
            });
          }
        } else {
          if (
            this.target.parentElement.classList[1] === "LongBoard" &&
            !this.hitTest(".LongBoard")
          ) {
            this.target.classList.remove("cloned-item-clicked");
            gsap.timeline().to(this.target, 1, {
              x: 0,
              y: 0,
            });
          }
          if (
            this.target.parentElement.classList[1] === "MappleBoard" &&
            !this.hitTest(".MappleBoard")
          ) {
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

  useEffect(() => {
    let firstItems = document.querySelectorAll(".first-clone");

    new Draggable.create(".first-clone", {
      type: "x,y",
      bounds: document.querySelector(".MainScreen"),
      onPress: function (e) {},
      onDragStart: function (e) {},
      onDrag: function (e) {},
      onClick: function () {},
      onDragEnd: function (e) {
        console.log(this);
        this.target.classList.remove("cloned-item-clicked");
        if (document.querySelectorAll(".highlight").length > 0) {
          document
            .querySelectorAll(".highlight")
            .forEach((item) => item.classList.remove("current-cloned-item"));
        }

        // if (this.hitTest(".LongBoard")) {
        //   console.log("long board");
        // }
        // if (this.hitTest(".MappleBoard")) {
        //   console.log("Mapple board");
        // }

        if (this.hitTest(".EmptyPlate")) {
          firstClone(this, e);
          itemSelected = this.target.id;
          this.target.style.transform = `translate3d(${0}px, ${0}px, 0 )`;
          backToFoodNames();
          onClickFoodName(foodItem);
        } else {
          this.target.style.transform = `translate3d(${0}px, ${0}px, 0 )`;
          backToFoodNames();
          onClickFoodName(foodItem);
        }
        if (!this.hitTest(".EmptyPlate")) {
          console.log("not plate");
        }
      },
    });
  }, []);

  ///////////////////////////////////////////////
  return (
    <div>
      <div className={`box `}>
        <BackArrowInner clickHandle={onPressBackToFoodNames} />
        <span className="title">Add to your board:</span>
        <button
          className="btn-inner"
          id="close-btn-inner"
          onClick={onCloseModal}
        >
          <img src={CloseBtn} height="38" alt="closeBtn" />
        </button>

        <div className="box-inner food-items-inner">
          <div>
            <div className="grid-options">
              {foodItem &&
                foodData[foodItem].map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        position: "relative",

                        background: `url(${item.value})`,
                        // center center / 50px no-repeat`,
                        // height: "81px",
                        // width: "81px",
                        transform: "translate3d(0px, 0px, 0px)",
                        border: "1px solid #b3b3b3",
                        borderRadius: "5px",
                      }}
                      className={`common-item ${item.title}`}
                    >
                      <div
                        className={`food-items a setPlateItem ${item.title} first-clone`}
                        style={{
                          background: `url(${item.value})no-repeat`,
                          backgroundPosition: "center",
                          height: "81px",
                          width: "81px",
                          backgroundSize: "60px",
                        }}
                      ></div>
                      <p className="fooditem-title">{item.title}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
