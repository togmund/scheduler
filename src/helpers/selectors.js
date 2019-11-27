function getAppointmentsForDay (state, day) {
  const filteredDays = state.days.filter(stateDay => stateDay.name === day);
  if (!filteredDays.length) {return filteredDays}
  else {
    const output = []
    filteredDays[0].appointments.forEach((e) => {output.push(state.appointments[e])})  
    return output};
}

module.exports = {
  getAppointmentsForDay
}