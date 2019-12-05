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
