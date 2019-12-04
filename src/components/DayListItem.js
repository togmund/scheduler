import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem({ name, spots, selected, setDay }) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formattedSpots =
    spots > 1
      ? spots + " spots remaining"
      : spots === 1
      ? spots + " spot remaining"
      : "no spots remaining";

  return (
    <li data-testid="day" className={dayClass} onClick={setDay}>
      <h2>{name}</h2>
      <h3>{formattedSpots}</h3>
    </li>
  );
}
