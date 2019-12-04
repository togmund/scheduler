import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
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
  }, []);

  const stateObject = {
    state: state,

    setDay: function setDay(day) {
      dispatch({ type: SET_DAY, day: day });
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
        dispatch({ type: SET_INTERVIEW, appointments: appointments });
      });
    },

    cancelInterview: function cancelInterview(id) {
      return Promise.all([axios.delete(`/api/appointments/${id}`)]).then(
        response => {
          // setState(prev => ({
          //   ...state
          // }));
          // dispatch({ type: SET_INTERVIEW, id, interview: null });
        }
      );
    }
  };

  return stateObject;
}

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      return { ...state, id: action.id, appointments: action.appointments };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
