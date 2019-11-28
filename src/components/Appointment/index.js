import React from "react";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Form from "./Form";

export default function Appointment({ id, time, interview, interviewers }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={(event) => { transition(CREATE) }} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={(event) => { transition() }}
          onCancel={(event) => { back() }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
    </article>
  );
} 