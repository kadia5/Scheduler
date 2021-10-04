import React from "react";
import className from 'classnames';
import "components/Button.scss";

export default function Button(props) {
   const buttonClass = className("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });
   // if (props.confirm) {
   //   buttonClass += " button--confirm";
   // }
   // if (props.danger) {
   //   buttonClass += " button--danger";
   // }
   console.log("props button_____",props)
   return (
     
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
       
     </button>
   );
 }
