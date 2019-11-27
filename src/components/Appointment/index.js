import React from "react";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

import "components/Appointment/styles.scss";

// import classNames from 'classnames';

export default function Appointment({id, time, interview}) {
  // const buttonClass = classNames();

  return (
    <article className="appointment">
      <Header time={time}/>
      {interview
        ? <Show student={interview.student} interviewer={interview.interviewer}/>
        : <Empty />}
      </article>
  );
} 