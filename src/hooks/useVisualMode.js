import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  //setHistory pushing into an arr(history)
  function transition(newMode, replace = false) {
    //if replace true tell it to remove and replace with newMode;
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      //prev =what already exists, add to a new arr with a new mode at the end
      setHistory((prev) => [...prev, newMode]);
    }
    setMode(newMode);
  }
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      /*next take last thing given in history arr and delete it
      prev refers to history now*/
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  }

  return {mode, transition, back};
}
