import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import axios from "axios";
import getAppointmentsForDay, { getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Appointment"
import "components/Application.scss";
import Appointment from "components/Appointment";

const stringDays = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
}
const dateToday = new Date();
const today = stringDays[dateToday.getDay()];

export default function Application(props) {

const [state, setState] = useState({
  day: today,
  days: [],
  appointments: {},
  interviewers: {}
});

const appointments = getAppointmentsForDay(state, state.day);
const interviewers = getInterviewersForDay(state, state.day);

const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
    />
  );
});

const setDay = day => setState(prev => ({ ...state, day }));

  useEffect(() => {

    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])

      .then((response) => {
        setState(prev => ({
          ...state,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data
        }));
      })

      .catch((error) => {
        console.log(error);
      })
  }, []);

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(id, interview);
    Promise.all([
      axios.get(`http://localhost:8001/api/appointments/`)
    ])

      .then((response) => {
        console.log(response)
        setState(prev => ({
          ...state,
          appointments
        }))
      })

      .catch((error) => {
        console.log(error);
      });

  }

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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
