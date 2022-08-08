import { Field } from "formik";
import React from "react";

interface SelectProp {
    label: string
    options: any[]
    name: string
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value: any
}

export default function Select(props: SelectProp) {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <select onChange={props.handleChange} id={props.name} name={props.name}>
        {props?.options.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
        })}
      </select>
    </div>
  );
}
