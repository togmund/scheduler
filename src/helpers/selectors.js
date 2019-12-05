// Because the appointment data is returned as an object by way of an api,
// these functions sort of serve a purpose similar to a SQL query,
// filtering and structuring the data from a set of disjonted apis,
// joining them together into the desired shape for the components

// Sort of does `SELECT appointments.* FROM days WHERE day = ${param.day}`
export default function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(stateDay => stateDay.name === day);
  if (!filteredDays.length) {
    return filteredDays;
  } else {
    const output = [];
    filteredDays[0].appointments.forEach(e => {
      output.push(state.appointments[e]);
    });
    return output;
  }
}

// Sort of does `SELECT interviewers.* FROM days WHERE day = ${param.day}`
export const getInterviewersForDay = (state, day) => {
  const filteredDays = state.days.filter(stateDay => stateDay.name === day);
  if (!filteredDays.length) {
    return filteredDays;
  } else {
    const output = [];
    filteredDays[0].interviewers.forEach(e => {
      output.push(state.interviewers[e]);
    });
    return output;
  }
};

// Sort of does `SELECT * FROM interview WHERE id = ${param.id}`
export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    return {
      ...interview,
      interviewer: state.interviewers[interview.interviewer]
    };
  }
};
