import React from 'react';

export default function Status (props) {

  return (
    <main className="appointment__card appointment__card--status">
    <img
      className="appointment__status-image"
      src="images/status.png"
      alt="Loading"
      // onClick={()=>props.onLoad()}
    />
    <h1 className="text--semi-bold">{props.message}</h1>
  </main>
  )
};
/* <h1 className="text--semi-bold">Saving</h1> */