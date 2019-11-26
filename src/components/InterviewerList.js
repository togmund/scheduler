import React from "react";

import DayListItem from "components/DayListItem";

// import classNames from 'classnames';

export default function DayList({ days, day, setDay }) {
  return (
    <ul>
      {days.map(d =>
        <DayListItem
          key={d.id}
          name={d.name}
          spots={d.spots}
          selected={d.name === day}
          setDay={setDay} />
      )}
    </ul>
  );
}