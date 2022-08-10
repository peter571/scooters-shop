import React from "react";

interface SelectProp {
  label: string;
  options: any[];
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any;
}

export default function Select(props: SelectProp) {
  return (
    <div className="my-1 flex flex-col">
      <label htmlFor={props.name}>{props.label}</label>
      <select
        className="px-2 py-1"
        onChange={props.handleChange}
        id={props.name}
        name={props.name}
        required
      >
        <option value=""></option>
        {props?.options?.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
