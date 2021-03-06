import React, {Fragment} from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        console.log('err+++++', error)
        transition(ERROR_SAVE, true)}
        );
  };

  const cancelInterview = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time}></Header>

        {mode === EMPTY && (
          <Empty onAdd={() => transition(CREATE)} onCancel={back} />
        )}

        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}

        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            student={props.interview.student}
            onSave={save}
            onCancel={back}
          />
        )}

        {mode === SAVING && <Status message="Saving..." />}
        {mode === ERROR_SAVE && (
          <Error
            message='error occured while attempting to save appointment'
            onClose={back}
          />
        )}
        {mode === DELETING && <Status message="Cancelling..." />}
        {mode === ERROR_DELETE && (
          <Error
            message='error occured while attempting to delete appointment'
            onClose={back}
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you'd like to delete..."
            onCancel={back}
            onConfirm={() => cancelInterview()}
          />
        )}
      </article>
    </Fragment>
  );
}
