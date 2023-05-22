import React, { Fragment } from 'react';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import "./styles.scss";

export default function Appointment(props) {
  const { time, interview } = props;
  const interviewer = { id: 1, name: "John Doe", avatar: "avatar.jpg" }; // Replace with your actual interviewer object

  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? (
        <Show student={interview.student} interviewer={interviewer.name} /> // Pass the interviewer name as a prop
      ) : (
        <Empty />
      )}
    </article>
  );
}