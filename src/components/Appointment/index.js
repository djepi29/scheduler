import React, { Fragment } from 'react';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Status from './Status';
import Confirm from './Confirm'
import "./styles.scss";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, id, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // console.log(interview)

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
      .then((response) => {
        transition(SHOW);
      });
  }

  function deleteInterview() {

    transition(DELETE)

      cancelInterview(id, interview)
      .then(() => {
        transition(EMPTY);
      })
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && (
        <Show 
        student={interview.student} 
        interviewer={interview.interviewer.name}
        onDelete={() => transition(CONFIRM)}
         />
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
      {mode === DELETE && (
        <Status message="Delete" />
      )}
      {mode === CONFIRM && (
        <Confirm 
        message="Are you sure you would like to Delete"
        onCancel={handleCancel}
        onConfirm={deleteInterview}
         />
      )}
    </article>
  );
}