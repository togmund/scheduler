import { useState } from "react";

// Function
// A Custom hook to dynamically set the visual state of the <Appointment /> component
// Invoked in /components/Appointment/index, passing in the current state as a string.
// Returns an object of functions to update that visual state
export default function useVisualMode(initial) {
  // Tracks the mode state
  const [mode, setMode] = useState(initial);

  // Stores a history for states that "skip"
  const [history, setHistory] = useState([initial]);

  // Given a new mode, will either set a new mode and add to the history
  // or when passed replace as true, will overwrite the current position in history
  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode);
      history.pop();
      setHistory(prev => [...history, newMode]);
    }
    setMode(newMode);
    setHistory(prev => [...history, newMode]);
  };

  // Will step back to the previous mode
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
}
