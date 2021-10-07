//helper functions for getting appointment, interviewer, and daily interview data
export function getAppointmentsForDay(state, day) {
  if (!state.days.length) return [];
  const selectedDay = state.days.find((d) => d.name === day);
  if (!selectedDay) return [];
  const currentDayAppoinments = [];
  for (const appointmentId of selectedDay.appointments) {
    currentDayAppoinments.push(state.appointments[appointmentId]);
  }
  return currentDayAppoinments;
}

export function getInterviewersForDay(state, day) {
  if (!state.days.length) return [];
  const [selectedDay] = state.days.filter((d) => d.name === day);

  if (!selectedDay) return [];
  const interviewers = selectedDay.interviewers.filter(
    (id) => id === state.interviewers[id].id
  );

  return interviewers.map((interviewer) => state.interviewers[interviewer]);
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewer = state.interviewers[interview.interviewer];
  return {...interview, interviewer};
}
