import React from "react";

type TYPE = "text" | "number";

interface InputProp {
  label: string;
  name: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  type: TYPE;
  value: any;
  maxLength?: number;
}

export default function Input(props: InputProp) {
  return (
    <div className="flex flex-col my-1">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        className={styles.input}
        type={props.type}
        onChange={props.handleChange}
        value={props.value}
        name={props.name}
        maxLength={props.maxLength}
      />
    </div>
  );
}

const styles = {
  input:
    "rounded-md border-2 border-grey hover:border-black focus:ring-blue-500 focus:border-blue-500 focus:border-black px-1 py-1",
};
