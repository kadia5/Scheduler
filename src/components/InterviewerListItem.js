import React, { useState } from "react";
import className from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  // const [day, setInterviewer] = useState("id");
  const interviewerClass = props.selected ? "interviewers__item--selected": "interviewers__item";
  // return (
  //   <li className={listItemClassName}
  //     onClick={()=> props.setInterviewer()}>
  //   <img
  //     className="interviewers__item-image"
  //     src={props.avatar}
  //     alt={props.name}
  //   />
  //   {props.selected ? props.name : ''}


  // </li>
      // )
      //Below refract to not pass id prop in InterviewerListItem
      return (
        <li className={interviewerClass} onClick={()=> props.setInterviewer()}>
          <img
            className="interviewers__item-image"
            src={props.avatar}
            alt={props.name}
          />
          {props.selected && props.name}
        </li>
      );
    };
