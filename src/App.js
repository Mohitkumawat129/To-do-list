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
  const [inputValue, setInputValue] = useState();
  // getLocalItems() for local storage
  const [Items, setItems] = useState(getLocalItems());
  // toggle to change + sign to edit when click on edit button
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editInInput, setEditInInput] = useState(null);

  const addClick = () => {
    if (!inputValue) {
      alert("Please write something to add");
    } else if (inputValue && !toggleSubmit) {
      setItems(
        Items.map((val) => {
          if (val.id === editInInput) {
            return { ...val, name: inputValue };
          }
          return val;
        })
      );
      setToggleSubmit(true);
      setInputValue("");
      setEditInInput(null);
    } else {
      const allInputValue = {
        id: new Date().getTime().toString(),
        name: inputValue,
      };
      setItems((val) => {
        return [...val, allInputValue];
      });
      setInputValue("");
    }
  };
  const removeClick = (index) => {
    const removeItem = Items.filter((val) => {
      return index !== val.id;
    });
    setItems(removeItem);
  };
  const editClick = (id) => {
    const editItem = Items.find((val) => {
      return val.id === id;
    });
    setInputValue(editItem.name); /* selected/edited item to input box */
    setToggleSubmit(false);
    setEditInInput(id);
  };
  // Set data to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(Items));
  }, [Items]);
  return (
    <>
      <div className="container">
        <div className="item">
          <h1>To do list</h1>
          <div className="inputAndBtn">
            <input
              type="text"
              placeholder="Add an item"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            {toggleSubmit ? (
              <button onClick={addClick}>+</button>
            ) : (
              <button onClick={addClick}>edit</button>
            )}
          </div>
          <ol className="list">
            {Items.map((val) => {
              return (
                <>
                  <li key={val.id}> {val.name} </li>

                  <div className="btnGroup">
                    <button onClick={() => editClick(val.id)}> edit </button>
                    <button onClick={() => removeClick(val.id)}> X </button>
                  </div>
                </>
              );
            })}
          </ol>
        </div>
        <div className="delBtn">
          <button onClick={() => setItems([])}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default App;
