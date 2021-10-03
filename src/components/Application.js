import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'components/Application.scss';
import DayList from 'components/DayList.js';
import Appointment from 'components/Appointment/Index';
import getAppointmentsForDay from 'helpers/selectors';

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "11pm",
//     interview: {
//       student: "Justin Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "10pm",
//     interview: {
//       student: "Just Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];
//props= nothing but params ex, funct that receives 2 var, once funct is called passes
export default function Application(props) {
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });
  // let dailyAppointments = [];
  const dailyAppointments = getAppointmentsForDay(state, state.day);
    // const dailyInterviews = getInterview(state, appointments.interview);

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
      console.log("days_____", days)
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
        {dailyAppointments.map((appointment) => (
          
          <Appointment key={appointment.id} {...appointment} />
        ))}
      </section>
    </main>
  );
}
//  {/* {dailyInterviews.map((interview) => (
 
//  <Interview key={interview.id} {...newInterview} interview={appointments.interview} />
// ))} */}