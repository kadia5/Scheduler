import React, {Fragment} from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
 
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
console.log("props shows____", props)
  return (
    <Fragment>
      <article className="appointment">
        {console.log("props.intervw-----",props.interview) }
        <Header time={props.time}></Header>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} onCancel={() => back(EMPTY)}/>}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE &&(
          <Form
          
          interviewers={props.interviewers}
          
          // selectedInterviewer={interviewer}
          // setInterviewer={key => setInterviewer(key)}
      
          />
          )};
      </article>
    </Fragment>
  );
}
// {/* {props.interview ?  <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={props.onEdit} onDelete={props.onDelete}/> : <Empty onAdd={props.onAdd}/>} */
