import React, { useState } from "react";
import className from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  // const [day, setInterviewer] = useState("id");
  const interviewerClass = className("interviewers__item",{ "interviewers__item--selected": props.selected});
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
