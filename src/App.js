import React, { useState } from "react";
import Component from "./Component";
const App = () => {
  const [inputList, setInputList] = useState("");
  const [Items, setItems] = useState([]);

  const inputChange = (event) => {
    setInputList(event.target.value);
  };
  const itemsList = () => {
    setItems((preValue) => {
      return [...preValue, inputList];
    });
    setInputList(""); //make our input field empty when 1 item is added so that
    //user can add more items
  };
  return (
    <>
      <div className="container">
        <div className="box">
          <h1>To do list</h1>
          <div className="inputField">
            <input
              type="text"
              placeholder="Add an items"
              onChange={inputChange}
              value={inputList}
            />
            <button onClick={itemsList}>+</button>
          </div>
          <ol className="orderList">
            {Items.map((val) => {
              return <Component text={val} />;
            })}
          </ol>
        </div>
      </div>
    </>
  );
};
export default App;
