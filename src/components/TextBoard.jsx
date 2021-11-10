import React from "react";
import CloseBtn from "../assets/icons/close-btn-inner.svg";
import { useHistory } from "react-router-dom";

export default function TextBoard({ closeModal, onClickFoodName, IsOpen }) {
  const history = useHistory();
  const foodNames = [
    {
      id: 0,
      slug: "meat",
      value: "Meat",
    },
    {
      id: 1,
      slug: "cheese",
      value: "Cheese",
    },
    {
      id: 2,
      slug: "nuts",
      value: "Nuts",
    },
    {
      id: 3,
      slug: "bread",
      value: "Bread",
    },
    {
      id: 4,
      slug: "crackers",
      value: "Crackers",
    },
    {
      id: 5,
      slug: "condiments",
      value: "Condiments",
    },
    {
      id: 6,
      slug: "fruits",
      value: "Fruits",
    },
    {
      id: 7,
      slug: "veggies",
      value: "Veggies",
    },
    {
      id: 8,
      slug: "sweets",
      value: "Sweets",
    },
  ];

  function openFoodItems(item) {
    history.push("/foodItems");
  }

  return (
    <div>
      <div className={`box`}>
        <span className="title">Add to your board:</span>
        <button className="btn-inner" id="close-btn-inner" onClick={closeModal}>
          <img src={CloseBtn} height="38" />
        </button>

        <div className="box-inner">
          <div className="grid-options">
            {foodNames.map((item) => {
              return (
                <div
                  key={item.id}
                  className="category size"
                  onClick={() => onClickFoodName(item.slug)}
                >
                  {item.value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
