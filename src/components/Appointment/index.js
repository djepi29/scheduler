import React, { Fragment } from 'react';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Status from './Status';
import Confirm from './Confirm'
import "./styles.scss";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, id, cancelInterview, editInterview } = props;
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

    transition(SAVING, true); // Transition to SAVING mode before calling bookInterview

    bookInterview(id, interview)
      .then((response) => {
        transition(SHOW);
      })
      .catch(error => {
        console.log('new error:',error)
        transition(ERROR_SAVE, true)
      });
  }

  function deleteInterview() {

    transition(DELETE, true)

      cancelInterview(id, interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        console.log('delete rerror:', error)
        transition(ERROR_DELETE, true)
      })
  }

  function handleEdit() {

    transition(EDIT)

    // editInterview(id, interview)
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && (
        <Show
        student={interview.student} 
        interviewer={interview.interviewer.name}
        onDelete={() => transition(CONFIRM)}
        onEdit={handleEdit}
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
      {mode === EDIT && (
         <Form
         student={interview.student}
         interviewers={interviewers}
         interviewer={interview.interviewer.id}
         onCancel={handleCancel}
         onSave={save}
       />
      )}
      {mode === ERROR_SAVE && 
        <Error
        message = 'could not save the appointment'
        onClose={handleCancel}
         />}
      {mode === ERROR_DELETE && (
        <Error
        message = 'could not cancel the appointment'
        onClose={handleCancel}
         />
      )}
    </article>
  );
}