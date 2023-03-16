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
  const deleteClick = (id) => {
    console.log("Deleted");
    setItems((preValue) => {
      return preValue.filter((arrEle, index) => {
        return index !== id;
      });
    });
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
            {Items.map((val, index /*of current item*/) => {
              return (
                <Component
                  key={index}
                  /*to select which item to delete*/
                  id={index}
                  text={val}
                  onSelect={deleteClick}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
};
export default App;
/*
create ui of to do list
store onChange and value in input field
create useState for value
create function for onChange and update onChange as event.target.value 
create new empty array as hook
create function for onClick update preValue,return [...preValue,inputValue(current item)]
update inputValue as ""
use map method in our newly created array in ul and return <li>{val}</li> 
create button with cross(X) sign give it onClick  
*/
