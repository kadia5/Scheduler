import {useState} from 'react';
import axios from 'axios';
// import Application from 'components/Application';

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview},
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, {interview}).then((res) => {
      setState({
        ...state,
        appointments,
      });
       updateSpots()
    });
  };
  const cancelInterview = (id) => {
    debugger;
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`, props.id)
    .then((res) => {
      setState({
        ...state,
        appointments,
      });
      updateSpots()
    });
  };
  const updateSpots = () => {
    let spots = 0;
    let appointmentValues = Object.values(state.appointments);
    for (const appointment of appointmentValues) {
      if (!appointment.interview) {
        spots++;
      }
    }
  };

  return {state, setState, bookInterview, cancelInterview, updateSpots};
   
}
