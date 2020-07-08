import React, { useState } from "react";
import CusButton from "../CusButton";

import "../../scss/main.scss";

function Home() {
  const [color, setColor] = useState();
  const [radius, setRadius] = useState();
  const [state, setstate] = useState(false);
  const [aid, setaid] = useState();
  const [arr] = useState([]);

  // testing for global access
  window.anuj = "puri";
  //  global acess successful

  const parsePx = (x) => {
    console.log("merelie", parseInt(x.split("px")[0]));
    return parseInt(x.split("px")[0]);
  };
  const toggleModal = (id) => {
    const modal = document.querySelector(".modal");
    if (id) {
      const tid = document.getElementById(id);
      modal.classList.add("visible");
      console.log(tid.style.top, tid.style.top.left);
      modal.style.top = parsePx(tid.style.top) + 5 + "px";
      modal.style.left = parsePx(tid.style.left) + 260 + "px";
      return;
    }
    modal.classList.remove("visible");
  };

  const btn = (col, rad, aid) => {
    setColor(col);
    setRadius(rad);
    setaid(aid);
    setstate(true);
  };

  function getPositions(ev) {
    toggleModal();
    const element = {};
    if (state === true) {
      const _mouseY = ev.clientY;
      const _mouseX = ev.clientX;
      element.type = "button";
      element.width = "70px";
      element.color = color;
      element.top = `${_mouseY}px`;
      element.left = `${_mouseX - 200}px`;
      element.radius = radius;
      element.aid = aid;

      setstate(false);
    } else {
      return;
    }
    arr.push(element);
  }

  const drop = (e) => {
    e.preventDefault();

    const _mouseY = e.clientY;
    const _mouseX = e.clientX;
    const card_id = e.dataTransfer.getData("card_id");
    console.log(card_id);
    const card = document.getElementById(card_id);
    card.style.display = "block";
    card.style.top = `${_mouseY}px`;
    card.style.left = `${_mouseX - 200}px `;
    console.log(card.style.top, card.style.top);
  };
  const dragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div className="Home">
      <aside>
        <button onClick={btn.bind(null, "red", "0px", "btn1")}>
          Red Button
        </button>
        <button onClick={btn.bind(null, "blue", "0px", "btn2")}>
          Blue Button
        </button>
        <button onClick={btn.bind(null, "red", "1000px", "btn3")}>
          Red Round Button
        </button>
        <button onClick={btn.bind(null, "blue", "1000px", "btn4")}>
          Blue Round Button
        </button>
      </aside>
      <div className="modal" id="add-modal">
        <div className="modal__content">
          <ul>
            <li>Edit</li>
            <li>Remove</li>
          </ul>
        </div>
      </div>
      <div
        id="moving"
        onDrop={drop}
        onDragOver={dragOver}
        onClick={getPositions}
      >
        {arr.map((ele, index) => {
          if (ele.type === "button") {
            return (
              <CusButton
                key={index}
                width={ele.width}
                color={ele.color}
                top={ele.top}
                left={ele.left}
                radius={ele.radius}
                aid={ele.aid}
                toggle={toggleModal}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
export default Home;
