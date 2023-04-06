import React, { useState, useEffect } from "react";
// Get items from local storage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
const App = () => {
  const [inputList, setInputList] = useState("");
  const [Items, setItems] = useState(getLocalItems());
  const inputChange = (event) => {
    setInputList(event.target.value);
  };
  const itemsList = () => {
    if (inputList === "") {
      alert("Please write something to add");
    } else {
      setItems((preValue) => {
        return [...preValue, inputList];
      });
      setInputList(""); //make our input field empty when 1 item is added so that
      //user can add more items
    }
  };
  // Remove an item from list
  const deleteClick = (id) => {
    const removeItems = Items.filter((curEle, index) => {
      return index !== id;
    });
    setItems(removeItems);
  };
  // Set data to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(Items));
  }, [Items]);
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
                <>
                  <div className="listClass">
                    <button onClick={() => deleteClick(index)}>X</button>
                    <li> {val} </li>
                  </div>
                </>
              );
            })}
          </ol>
          <div className="deleteBtn">
            <button onClick={() => setItems([])}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
