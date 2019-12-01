import React, { useState } from "react";

export default function useApplicationData(initial) {

//   Our useApplicationData Hook will return an object with four keys.

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.

// I have read that storing objects as strings
// makes for more performant compiles and faster load time
const stateObject = JSON.parse({
  
})

  return { mode, transition, back };
};