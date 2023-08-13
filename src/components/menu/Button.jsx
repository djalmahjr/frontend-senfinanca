function Button({ condition, iconDefault, iconActive, text, onClick }) {
  return (
    <li className={`tab${condition ? " selected" : ""}`} onClick={onClick}>
      <img
        src={condition ? iconActive : iconDefault}
        className="my-svg"
        alt="Icone Balanço"
      />
      <span>{text}</span>
    </li>
  );
}

export default Button;
