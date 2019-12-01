import React from "react";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Form from "./Form";

export default function Appointment({ id, time, interview, interviewers, bookInterview, cancelInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const ERROR_SAVE = "ERROR_SAVE";
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";
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
    })
    .catch(() => {
      transition(ERROR_SAVE, true);
    });
  }

  function deleteInterview() {
    transition(DELETING);
    cancelInterview(id)
      .then(() => {
      transition(EMPTY);
    })
      .catch(() => {
        transition(ERROR_DELETE, true);
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
      {mode === ERROR_SAVE && (
        <Error
          message={ERROR_SAVE}
          onClose={(event) => { back() }}
      />)}
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
          propCurrentInterviewerId={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={(event) => { back() }}
        />
      )}
      {mode === DELETING && (<Status message={DELETING} />)}
      {mode === ERROR_DELETE && (
        <Error
          message={ERROR_DELETE}
          onClose={(event) => { back() }}
      />)}


    </article>
  );
} 