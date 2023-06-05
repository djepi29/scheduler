import React, { Fragment } from 'react';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Status from './Status';
import "./styles.scss";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, id } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const handleAdd = () => {
    transition(CREATE);
  }

  const handleCancel = () => {
    back();
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING); // Transition to SAVING mode before calling bookInterview

    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      });
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer.name} />
      )}
      {mode === EMPTY && <Empty onAdd={handleAdd} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={handleCancel}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
    </article>
  );
}