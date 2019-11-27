import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import axios from "axios";

import "components/Appointment"
import "components/Application.scss";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 3,
    time: "1pm",
    interview: {
      student: "Joe Montana",
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
      student: "Lydia Miller-Jones",
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
  const [state, setState] = useState({
    day: today,
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...state, days }));

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/days")
      .then((response) => {
        setDays(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

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
            days={state.days}
            day={state.day}
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
