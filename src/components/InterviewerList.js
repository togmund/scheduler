import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import classNames from 'classnames';


import "components/InterviewerList.scss";

export default function InterviewerList({ interviewers, value, onChange }) {

  const interviewersClass = classNames("interviewers")
  const interviewersHeaderClass = classNames("interviewers__header")
  const interviewersListClass = classNames("interviewers__list")
  console.log(interviewers)
  console.log("valueInInterviewerList",value);
  return (
    <section className={interviewersClass}>
      <h4 className={interviewersHeaderClass}>
        Interviewer
      </h4>
      <ul className={interviewersListClass}>
        {interviewers.map(interviewer =>
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === value}
            setInterviewer={event => onChange(interviewer.id)} />
        )}
      </ul>
    </section>
  );
}