import React from "react";

// import classNames from 'classnames';

export default function Header(props) {
  // const buttonClass = classNames();

  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}