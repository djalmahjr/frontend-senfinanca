import { formatCurrency } from "../../utils";

function Input({
  label,
  nameField,
  type,
  onChange,
  placeHolder,
  isCurrency,
  state,
}) {
  const handleChange = (event) => {
    const rawValue = event.target.value;
    const formattedValue = formatCurrency(rawValue);
    onChange({
      target: {
        name: nameField,
        value: formattedValue,
      },
    });
  };

  return (
    <div className="input-field">
      <label htmlFor="">{label}</label>
      <input
        type={type}
        name={nameField}
        value={state[nameField] || ""}
        onChange={isCurrency ? handleChange : onChange}
        placeholder={placeHolder}
      />
    </div>
  );
}

export default Input;
