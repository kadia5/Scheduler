// function selectUserByName(state, day) {
//   const filteredNames = state.users.filter(user => user.day === day);
//   return filteredNames;
// }
export default function getAppointmentsForDay(state, day) {
  if (!state.days.length) return [];
  const selectedDay = state.days.find(d => d.name === day);
  const currentDayAppoinments = [];
  for (const appointmentId of selectedDay.appointments){
    // state.appointments[appointmentId];
    currentDayAppoinments.push(state.appointments[appointmentId]);
  }
  return currentDayAppoinments;
}

export function getInterview(state, interview) {
  const newInterview = {  
    "student": "Lydia Miller-Jones",
    "interviewer": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    }
  }
  const selectedInterview = state.newInterview.find(i => i.interview === interview);
  return selectedInterview || null;
}