import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

// The complex storage of state as an object for use in /components/Application.js
// updated by way of the imported reducer.
// Exported as a custom hook, used for maintaining and updating global state
export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Defines the promise to grab the current state from the database
  const refreshState = () => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(response => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Invokes the promise as a side effect
    refreshState();
  }, []);

  const stateObject = {
    state: state,

    setDay: function setDay(day) {
      dispatch({ type: SET_DAY, day: day });
    },

    // Function servese double duty, both booking and editing interviews
    // edits denoted by an edit boolean which is defaulted to false
    bookInterview: function bookInterview(id, interview, edit = false) {
      // Scaffolds out the new state contingent on the result of the upcoming promise
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = [
        ...state.days.map(day => {
          // only updates the count of spots for the day with the new appointment
          // and only in cases where we are not editing an existing appointment
          if (day.appointments.includes(id) && !edit) {
            return { ...day, spots: day.spots - 1 };
          }
          return day;
        })
      ];
      // Returns a promise that hits the database with the new appointment
      return Promise.all([
        axios.put(`/api/appointments/${id}`, { interview })
      ]).then(response => {
        if (response) {
          // Dispatches a new state when the promise resolves
          dispatch({
            type: SET_INTERVIEW,
            appointments: appointments,
            days: days
          });
        }
      });
    },

    cancelInterview: function cancelInterview(id) {
      // Scaffolds out the new state contingent on the result of the upcoming promise
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = [
        ...state.days.map(day => {
          if (day.appointments.includes(id)) {
            return { ...day, spots: day.spots + 1 };
          }
          return day;
        })
      ];
      // Returns a promise that hits the database with the request to delete appointment
      return Promise.all([axios.delete(`/api/appointments/${id}`)]).then(
        response => {
          if (response) {
            // Dispatches a new state when the promise resolves
            dispatch({
              type: SET_INTERVIEW,
              appointments: appointments,
              days: days
            });
          }
        }
      );
    }
  };

  return stateObject;
}
