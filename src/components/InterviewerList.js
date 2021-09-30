import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';

export default function InterviewerList(props) {
//call a loop/map that calls intervieListItem for each list item
//   return (
// <section className="interviewers">
//   <h4 className="interviewers__header text--light">Interviewer</h4>
//   <ul className="interviewers__list">
//     {props.interviewers.map((interviewer)=>
//       <InterviewerListItem
//       id={interviewer.id}
//       name={interviewer.name}
//       avatar={interviewer.avatar}
//       selected={interviewer.name === props.interviewer}
//       setInterviewer={props.setInterviewer}
//       />
//       )}
//   </ul>
// </section>
//   )
      //Below refract to not pass id prop in InterviewerListItem
   const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
   
  });
};