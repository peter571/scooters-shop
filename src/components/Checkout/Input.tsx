import React from "react";

type TYPE = "text" | "number";

interface InputProp {
  label: string;
  name: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  type: TYPE;
  value: any;
  maxLength?: number;
  placeholder: string;
}

export default function Input(props: InputProp) {
  return (
    <div className="flex flex-col gap-1 my-1">
      <label className="text-sm" htmlFor={props.name}>{props.label}</label>
      <input
        className="rounded-sm outline-none px-1 focus:ring-1 focus:ring-black"
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.handleChange}
        value={props.value}
        name={props.name}
        maxLength={props.maxLength}
        required={true}
      />
    </div>
  );
}
