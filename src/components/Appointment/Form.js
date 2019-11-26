import React from "react";
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

// import classNames from 'classnames';

export default function Empty({name, interviewers, currentInterviewer, onSave, onCancel}) {
  // const buttonClass = classNames();

  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={interviewers} value={currentInterviewer} onChange={setInterviewer} />
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

// The Form component should track the following state:
// name:String
// interviewer:Number

// The Form component should have the following actions:
// setName:Function
// setInterviewer:Function

// The Form component should take the following props:
// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function