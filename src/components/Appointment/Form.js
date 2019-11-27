import React, {useState} from "react";
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

// import classNames from 'classnames';

export default function Form({ propName, interviewers, propCurrentInterviewer, onSave, onCancel }) {
  // const buttonClass = classNames();
  const [name, setName] = useState(propName || "");
  const [currentInterviewer, setcurrentInterviewer] = useState(propCurrentInterviewer || null);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange={(event) => setName(event.target.name)}
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={currentInterviewer}
          onChange={(event) => setcurrentInterviewer(event.target.currentInterviewer)}
          />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}