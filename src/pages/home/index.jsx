import { useEffect } from "react";
import Display from "../../components/display";
import { useGlobalState } from "../../hooks/useGlobalState";
import saveMoneyIcon from "../../assets/save-money-icon.svg";
import exitMoneyIcon from "../../assets/exit-money-icon.svg";
import { formatCurrency } from "../../utils";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const { loadDataState, dataState } = useGlobalState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (dataState.length < 1) {
      loadDataState();
    }
  }, []);
  return (
    <div className="home">
      <div className="message">
        <h1>Olá, tudo bem?</h1>
        <p>Organize suas finanças aqui!</p>
      </div>
      <div className="view">
        <section className="left">
          <Display />
        </section>
        <section className="rigth">
          <div className="resume">
            <div className="header-rigth">
              <p>Ultimas transações</p>
              <a onClick={() => navigate("/balance")}>Ver mais</a>
            </div>
            {dataState?.slice(0, 5).map((stt) => (
              <li key={stt.guid}>
                <div className="identify">
                  {stt.type == 0 ? (
                    <img src={saveMoneyIcon} alt="Icone Carteira" />
                  ) : (
                    <img src={exitMoneyIcon} alt="Icone Saida" />
                  )}
                  <span className="title">{stt.title}</span>
                </div>
                <span className="category">{stt.category}</span>
                <span className="amount">{formatCurrency(stt.value)}</span>
              </li>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
