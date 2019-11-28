import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setMode(newMode);
    setHistory(prev => ([...history, newMode]));
  }

  const back = () => {
    history.pop()
    setMode(history[history.length-1]);
  }

  return { mode, transition, back };
};