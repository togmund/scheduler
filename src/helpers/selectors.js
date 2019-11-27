function getAppointmentsForDay (state, day) {
  const filteredDays = state.days.filter(stateDay => stateDay.name === day);
  if (!filteredDays.length) {return filteredDays}
  else {
    const output = []
    filteredDays[0].appointments.forEach((e) => {output.push(state.appointments[e])})  
    return output};
}

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};

console.log("result:",getAppointmentsForDay(state, "Wednesday"));

module.exports = {
  getAppointmentsForDay
}

// This is our first time working with selectors, so lets start by breaking down the various things we need our function to do:

// We need to start by finding the object in our state.days array who's name matches the provided day. With this information we can now access that specific days appointment array.

// Once we have access to the appointment array for the given day, we'll need to iterate through it, comparing where it's id matches the id of states.appointments and return that value.

// We should also probably do a bit of validation. If there are no appointments on the given day, our days data will be empty. According to our tests, in a case like this, we should return an empty array.

// Once each of our tests are passing, we're ready to move on!