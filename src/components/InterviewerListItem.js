import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem({
  name,
  avatar,
  selected,
  setInterviewer,
}) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  const handleClick = () => {
    setInterviewer();
  };

  return (
    <li className={interviewerClass} onClick={handleClick}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && <span className="interviewers__item-name">{name}</span>}
    </li>
  );
}
