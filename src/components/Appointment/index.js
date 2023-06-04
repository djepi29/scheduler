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
  const { time, interview, interviewers, bookInterview, id } = props;
  // console.log(interview)
  // const interviewer = { id: 1, name: "John Doe", avatar: "avatar.jpg" }; // Replace with your actual interviewer object

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const handleAdd = () => {
    transition(CREAT);
  }


  const handleCancel = () => {
    back();
  }
 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview( id, interview);
    transition(SHOW);
  }
  


  return ( 
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer.name} /> 
      )}
      {mode === EMPTY && <Empty  onAdd={handleAdd}/>}
      {mode === CREAT && (
        <Form   
        interviewers={interviewers}
        onCancel= {handleCancel}
        onSave={save}
        
        />
      )}
    </article>
  );
}