import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(response => {
        setState(prev => ({
          ...state,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data
        }));
      })

      .catch(error => {
        console.log(error);
      });
  }, []);

  const stateObject = {
    state: state,

    setDay: function setDay(day) {
      setState(prev => ({ ...state, day }));
    },

    bookInterview: function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return Promise.all([
        axios.put(`/api/appointments/${id}`, { interview })
      ]).then(response => {
        setState(prev => ({
          ...state,
          appointments
        }));
      });
    },

    cancelInterview: function cancelInterview(id) {
      return Promise.all([axios.delete(`/api/appointments/${id}`)]).then(
        response => {
          setState(prev => ({
            ...state
          }));
        }
      );
    }
  };

  return stateObject;
}
