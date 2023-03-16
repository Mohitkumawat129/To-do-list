import React from "react";
const Component = (props) => {
  return (
    <>
      <div className="listClass">
        <button
          onClick={() => {
            props.onSelect(props.id); //we will get id of selected item
          }}
        >
          X
        </button>
        <li>{props.text}</li>
      </div>
    </>
  );
};
export default Component;
