import React, { useState } from "react";
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"



export default function Form({ propName, interviewers, propCurrentInterviewerId, onSave, onCancel }) {

  const [name, setName] = useState(propName || "");
  const [currentInterviewer, setCurrentInterviewer] = useState(propCurrentInterviewerId || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("")
    setCurrentInterviewer(null)
    setError("")
  }
  
  const cancel = () => {
    reset()
    onCancel()
  }

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    
    onSave(name, currentInterviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">

        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange={(event) => {setName(event.target.value); setError("");}}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>

        </form>
        <InterviewerList
            interviewers={interviewers}
            value={currentInterviewer}
            onChange={(event) => { setCurrentInterviewer(event) }}
          />


      </section>a
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={()=> cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate() }>Save</Button>
        </section>
      </section>
    </main>
  );
}