import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';

export default function InterviewerList(props) {
//call a loop/map that calls intervieListItem for each list item
  return (
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {props.interviewers.map((interviewer)=>
      <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={day.name === props.day}
      setInterviewer={props.setInterviewer}
      />
      )}
  </ul>
</section>

  )
};