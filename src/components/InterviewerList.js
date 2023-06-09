import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";

function InterviewerList({
  interviewers,
  setInterviewer,
  interviewer,
  value,
  onChange,
}) {
  const interviewerItems = interviewers.map((interviewerItem) => (
    <InterviewerListItem
      key={interviewerItem.id}
      name={interviewerItem.name}
      avatar={interviewerItem.avatar}
      selected={interviewerItem.id === value}
      setInterviewer={() => onChange(interviewerItem.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItems}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
