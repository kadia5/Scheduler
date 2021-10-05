import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'components/Application.scss';
import DayList from 'components/DayList.js';
import Appointment from 'components/Appointment/Index';
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from 'helpers/selectors';

//props= nothing but params ex, funct that receives 2 var, once funct is called passes
export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const bookInterview = (id, interview) => {
    debugger;
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((res) => {
      setState({
      ...state,
      appointments
    });
  })
}

  useEffect(() => {
    // axios.get("/api/days").then(response => {
    //  return setDays(response.data);
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      // set your states here with the correct values...
      const [days, appointments, interviewers] = all;
      console.log('days_____', days);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      console.log(all[0]); // first
      console.log(all[1]); // second
      console.log(all[2]); // third
    });
  });
  // }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            //makes new obj with prev state on it
            setDay={(day) => setState({...state, day})}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          return (
            // {const dailyInterviews = getInterview(state, appointment.interview)}
            <Appointment
              key={appointment.id}
              {...appointment}
              interviewers={getInterviewersForDay(state, state.day)}
              interview={getInterview(state, appointment.interview)}
              bookInterview={bookInterview}
              
              
              
            />
          );
        })}
      </section>
    </main>
  );
}
//  {/* {dailyInterviews.map((interview) => (

//  <Interview key={interview.id} {...newInterview} interview={appointments.interview} />
// ))} */}
