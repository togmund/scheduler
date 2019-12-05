import React from "react";

import DayListItem from "components/DayListItem";

// Bundles up all the days into a structured list based on state
export default function DayList({ days, currentDay, setDay }) {
  return (
    <ul>
      {days.map(day => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === currentDay}
          setDay={event => setDay(day.name)}
        />
      ))}
    </ul>
  );
}
