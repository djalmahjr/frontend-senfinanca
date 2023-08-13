// import { useState } from "react";

const Dropdown = ({ options, onSelect, nameField, label, state }) => {
  //   const [selectedValue, setSelectedValue] = useState(options[0].value);

  //   const handleSelectChange = (event) => {
  //     setSelectedValue(event.target.value);
  //     onSelect(event);
  //   };

  return (
    <div className="select-field">
      <label htmlFor={nameField}>{label}</label>
      <select
        name={nameField}
        value={state[nameField] || ""}
        onChange={onSelect}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
