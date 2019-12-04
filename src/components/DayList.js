import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList({ days, currentDay, setDay }) {
  return (
    <ul>
      {days.map(day => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === currentDay}
          setDay={setDay}
        />
      ))}
    </ul>
  );
}
