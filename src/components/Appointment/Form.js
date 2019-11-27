import React, {useState} from "react";
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

export default function Form({ propName, interviewers, propCurrentInterviewer, onSave, onCancel }) {

  const [name, setName] = useState(propName || "");
  const [currentInterviewer, setCurrentInterviewer] = useState(propCurrentInterviewer || null);

  const reset = () => {
    setName("")
    setCurrentInterviewer(null)
  }
  const cancel = () => {
    reset()
    return (
      onCancel
    )
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">

        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter Student Name"
          />
        </form>

        <InterviewerList
          interviewers={interviewers}
          value={currentInterviewer}
          onChange={(event) => setCurrentInterviewer(event)}
        />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}