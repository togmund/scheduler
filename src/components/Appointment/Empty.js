import React from "react";

// import classNames from 'classnames';

export default function Empty({onAdd}) {
  // const buttonClass = classNames();

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
}