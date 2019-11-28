import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setMode(newMode);
    setHistory(newMode);
  }
  const back = () => {
    setMode(history);
  }

  return { mode, transition, back };
};