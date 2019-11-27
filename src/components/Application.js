import React, { useState } from "react";
import DayList from "components/DayList";

import "components/Appointment"
import "components/Application.scss";
import Appointment from "components/Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 3,
    time: "1pm",
    interview: {
      student: {
        id: 2,
        name: "Joe Montana"
      },
      interviewer: {
        id: 2,
        name: "Ted Ogggogoe",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "2pm",
    interview: {
      student: {
        id: 1,
        name: "Lydia Miller-Jones"
      },
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const date = new Date();
  const today = date.getDay();
  const [day, setDay] = useState(today);
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Environment Setup" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment =>
          <Appointment key={appointment.id} {...appointment} />
        )}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
