import logo from "../../assets/logo.svg";
import dashIconWhite from "../../assets/dash-icon-white.svg";
import dashIconGrey from "../../assets/dash-icon-grey.svg";
import balanceIconWhite from "../../assets/balance-icon-white.svg";
import balanceIconGrey from "../../assets/balance-icon-grey.svg";
import Button from "./Button";
import "./menu.css";
import { useLocation, useNavigate } from "react-router-dom";

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="menu-main">
      <div className="logo">
        <div>
          <img src={logo} alt="Logo SenFinanca" />
          <span>SenFinança</span>
        </div>
      </div>
      <div>
        <hr />
      </div>
      <div className="tabs">
        <ul>
          <Button
            condition={location.pathname === "/"}
            onClick={() => navigate("/")}
            iconActive={dashIconWhite}
            iconDefault={dashIconGrey}
            text="Inicio"
          />
          <Button
            condition={location.pathname === "/balance"}
            onClick={() => navigate("/balance")}
            iconActive={balanceIconWhite}
            iconDefault={balanceIconGrey}
            text="Balanço"
          />
        </ul>
      </div>
    </div>
  );
}

export default Menu;
