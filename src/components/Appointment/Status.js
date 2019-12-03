import React from "react";

// import classNames from 'classnames';

export default function Status({ message }) {
  // const buttonClass = classNames();

  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{message}</h1>
    </main>
  );
}