// Exports a function to update state by way of a reducer
// Given more time, would refactor to an object lookup
// Takes in the current state, and a prescribed modification
// Returns an updated state based on the modification
export default function reducer(state, action) {
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
      return {
        ...state,
        id: action.id,
        appointments: action.appointments,
        days: action.days
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
