import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const reset = () => {
    setInterviewer(null);
    setName("");
  }
  const cancel = (event) => {
    reset();
    props.onCancel();
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={function (event) {setName(event.target.value)}}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          selectedInterviewer={interviewer}
          setInterviewer={key => setInterviewer(key)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={props.onCancel} danger>Cancel</Button>
          <Button onClick={props.onSave} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}