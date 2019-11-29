import React from "react";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Form from "./Form";

export default function Appointment({ id, time, interview, interviewers, bookInterview, cancelInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview).then(() => {
      transition(SHOW);
    });
  }

  function deleteInterview() {
    transition(DELETING);
    cancelInterview(id).then(() => {
      transition(EMPTY);
    });
  }

  console.log("Index currentInterviewer:", id, interview)
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={(event) => { transition(CREATE) }} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={(event) => { back() }}
        />
      )}
      {mode === SAVING && (<Status message={SAVING} />)}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={(event) => { transition(CONFIRM) }}
          onEdit={(event) => { console.log("Edited interviewer:",interview.interviewer); transition(EDIT); }}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={CONFIRM}
          onCancel={(event) => { back() }}
          onConfirm={deleteInterview}
        />)}
      {mode === EDIT && (
        <Form
          propName={interview.student}
          propCurrentInterviewer={interview.interviewer}
          interviewers={interviewers}
          onSave={save}
          onCancel={(event) => { back() }}
        />
      )}
      {mode === DELETING && (<Status message={DELETING} />)}

    </article>
  );
} 