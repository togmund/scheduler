import React from "react";

import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Form from "./Form";

export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview
}) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERRORSAVING = "Could not save appointment.";
  const ERRORDELETING = "Could not delete appointment.";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    if (mode === EDIT) {
      transition(SAVING, true);
      bookInterview(id, interview, true)
        .then(() => {
          transition(SHOW);
        })
        .catch(() => {
          transition(ERRORSAVING, true);
        });
    } else {
      transition(SAVING, true);
      bookInterview(id, interview)
        .then(() => {
          transition(SHOW);
        })
        .catch(() => {
          transition(ERRORSAVING, true);
        });
    }
  }

  function deleteInterview() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERRORDELETING, true);
      });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => {
            back();
          }}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === ERRORSAVING && (
        <Error
          message={ERRORSAVING}
          onClose={() => {
            back();
          }}
        />
      )}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={CONFIRM}
          onCancel={() => {
            back();
          }}
          onConfirm={deleteInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          propName={interview.student}
          propCurrentInterviewerId={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => {
            back();
          }}
        />
      )}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === ERRORDELETING && (
        <Error
          message={ERRORDELETING}
          onClose={() => {
            back();
          }}
        />
      )}
    </article>
  );
}
