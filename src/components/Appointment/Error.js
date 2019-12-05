import React from "react";

// import classNames from 'classnames';

export default function Error({ message, onClose }) {
  // const buttonClass = classNames();

  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">{message}</h1>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={onClose}
      />
    </main>
  );
}
