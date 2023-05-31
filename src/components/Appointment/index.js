import React, { Fragment } from 'react';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import "./styles.scss";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREAT = "CREAT";

export default function Appointment(props) {
  const { time, interview, interviewers } = props;
  const interviewer = { id: 1, name: "John Doe", avatar: "avatar.jpg" }; // Replace with your actual interviewer object

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const handleAdd = () => {
    transition(CREAT);
  }

  const handleCancel = () => {
    back();
  }


  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interviewer.name} /> 
      )}
      {mode === EMPTY && <Empty  onAdd={handleAdd}/>}
      {mode === CREAT && (
        <Form   
        interviewers={interviewers}
        onCancel= {handleCancel}
        
        />
      )}
    </article>
  );
}