import React, {Fragment} from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from 'components/Appointment/Status';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const save = (name, interviewer)=> {
    debugger;
    const interview = {
      
      student: name,
      interviewer
    };
    transition(SAVING);
    const bookInterview = props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  }

  //declare a function

  return (
    <Fragment>
      <article className="appointment">
        
        <Header time={props.time}></Header>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} onCancel={() => back(EMPTY)}
        
        />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            
          />
        )}
        {mode === CREATE &&(
          <Form
          interviewers={props.interviewers} 

          onSave={save} 
      
          />
          )}
          {mode === SAVING && (
          <Status 
            message="Saving..."
          /> 
        )}
      </article>
    </Fragment>
  );
}
//cant find the interview value so student has no value

// {/* {props.interview ?  <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={props.onEdit} onDelete={props.onDelete}/> : <Empty onAdd={props.onAdd}/>} */
