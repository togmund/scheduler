function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(state => state.day === day);
  return filteredDays;
}