import React from 'react';
import className from 'classnames';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  return (
    //iterating thru days arr in index.js returning each day as a component itself
    <ul>
      {props.days.map((day) => (
        <DayListItem
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      ))}
    </ul>
  );
}
