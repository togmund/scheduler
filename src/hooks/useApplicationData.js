import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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
    refreshState();
  }, []);

  const stateObject = {
    state: state,

    setDay: function setDay(day) {
      dispatch({ type: SET_DAY, day: day });
    },

    bookInterview: function bookInterview(id, interview, edit = false) {
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
          if (day.appointments.includes(id) && !edit) {
            return { ...day, spots: day.spots - 1 };
          }
          return day;
        })
      ];
      return Promise.all([
        axios.put(`/api/appointments/${id}`, { interview })
      ]).then(response => {
        if (response) {
          dispatch({
            type: SET_INTERVIEW,
            appointments: appointments,
            days: days
          });
        }
      });
    },

    cancelInterview: function cancelInterview(id) {
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
      return Promise.all([axios.delete(`/api/appointments/${id}`)]).then(
        response => {
          if (response) {
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
