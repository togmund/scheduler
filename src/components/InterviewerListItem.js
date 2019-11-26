import React from "react";

import "components/InterviewerListItem.scss";

import classNames from 'classnames';

export default function InterviewerListItem({ id, name, avatar, selected, setInterviewer }) {

  const interviewersClass = classNames("interviewers__item", {
    'interviewers__item--selected': selected
  })
  const interviewersClassAvatar = classNames("interviewers__item-image", {
    'interviewers__item-image--selected': selected
  })

  return (
    <li className= {interviewersClass} >
      <img
        className= {interviewersClassAvatar}
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  );
}
