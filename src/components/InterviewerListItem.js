import React from "react";

import "components/InterviewerListItem.scss";

import classNames from 'classnames';

export default function InterviewerListItem({ id, name, avatar, selected, setInterviewer }) {

  const interviewerClass = classNames("interviewers__item", {
    'interviewers__item--selected': selected
  })
  const interviewerAvatarClass = classNames("interviewers__item-image", {
    'interviewers__item-image--selected': selected
  })

  return (
    <li
      id={id}
      className= {interviewerClass}
      onClick={setInterviewer}
      >
      <img
        className= {interviewerAvatarClass}
        src={avatar}
        alt={name}
      />
      {selected ? name : ""}
    </li>
  );
}
