import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"


export default function DayListItem({ name, spots, selected, setDay }) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  const spotsText = spots === 0 ? "no spots remaining" : `${spots} spots remaining`;

  const handleClick = () => {
    setDay(name);
  };

  return (
    <li className={dayClass} onClick={handleClick}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spotsText}</h3>
    </li>
  );
}