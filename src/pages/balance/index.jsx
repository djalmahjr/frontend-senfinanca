import { useEffect, useState } from "react";
import Input from "./Input";
import Dropdown from "./Dropdown";
import addIcon from "../../assets/add-icon.svg";
import saveMoneyIcon from "../../assets/save-money-icon.svg";
import exitMoneyIcon from "../../assets/exit-money-icon.svg";
import { formatCurrency } from "../../utils";
import { useGlobalState } from "../../hooks/useGlobalState";
import "./Balance.css";
import { format } from "date-fns";

function Balance() {
  const [formState, setFormState] = useState({});
  const [filtersState, setFiltersState] = useState({});
  const [dataFilteredState, setDataFilteredState] = useState([]);
  const [optionsCategoryFilter, setOptionsCategoryFilter] = useState([{}]);
  const [display, setDisplay] = useState({
    totalEntry: 0,
    totalExit: 0,
    balance: 0,
  });

  const { dataState, updateDataState, loadDataState } = useGlobalState();

  const options = [
    { value: "", name: "" },
    { value: 0, name: "Entrada" },
    { value: 1, name: "Saida" },
  ];
  const onChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormState((stt) => ({ ...stt, [name]: value }));
  };
  const onChangeFilter = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setFiltersState((stt) => ({ ...stt, [name]: value }));

    if (value !== "") {
      if (name === "category" && filtersState?.type) {
        return setDataFilteredState(
          dataState.filter(
            (item) => item[name] === value && item.type === filtersState?.type
          )
        );
      } else if (name === "type" && filtersState?.category) {
        return setDataFilteredState(
          dataState.filter(
            (item) =>
              item[name] === value && item.category === filtersState?.category
          )
        );
      } else {
        return setDataFilteredState(
          dataState.filter((item) => item[name] === value)
        );
      }
    } else {
      setDataFilteredState(dataState);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(formState).length < 4) {
      alert("Preencha todos os campos");
    }
    if (Object.keys(formState).length === 4) {
      const form = formState;
      form.value = form.value.replace(/[^\d]/g, "");
      updateDataState(form);
    }
  };

  useEffect(() => {
    if (dataState.length < 1) {
      loadDataState();
    }
  }, []);

  useEffect(() => {
    setDataFilteredState(dataState);
    setFiltersState({});
    setFormState({});

    const optionsCategory = dataState
      .filter((item, index, arr) => arr.indexOf(item) === index)
      .map((item) => ({ value: item.category, name: item.category }));
    setOptionsCategoryFilter([
      { value: "", name: "Todas" },
      ...optionsCategory,
    ]);

    const totalEntry = dataState.reduce(
      (acc, item) => (item.type == 0 ? acc + Number(item.value) : acc),
      0
    );
    const totalExit = dataState.reduce(
      (acc, item) => (item.type == 1 ? acc + Number(item.value) : acc),
      0
    );
    const balance = totalEntry - totalExit;
    setDisplay({
      totalEntry: totalEntry,
      totalExit: totalExit,
      balance: balance,
    });
  }, [dataState]);

  return (
    <div className="balance-container">
      <section className="insertion">
        <form>
          <Input
            nameField="title"
            state={formState}
            label="Titulo"
            placeHolder="Ex: Cartão"
            onChange={onChange}
          />
          <Dropdown
            nameField="type"
            state={formState}
            options={options}
            label="Tipo"
            onSelect={onChange}
          />
          <Input
            nameField="category"
            state={formState}
            label="Categoria"
            placeHolder="Ex: Alimentação"
            onChange={onChange}
          />
          <Input
            nameField="value"
            state={formState}
            label="Valor"
            placeHolder="Ex: 7,99"
            onChange={onChange}
            isCurrency={true}
          />
          <div>
            <button type="submit" onClick={onSubmit}>
              <img src={addIcon} alt="Icone adicionar" />
            </button>
          </div>
        </form>
      </section>
      <section className="transaction">
        <div className="display">
          <div className="total-entries">
            <span className="amount">{formatCurrency(display.totalEntry)}</span>
            <span>Total entradas</span>
          </div>
          <div className="total-exit">
            <span className="amount">{formatCurrency(display.totalExit)}</span>
            <span>Total saidas</span>
          </div>
          <div className="total-balance">
            <span className="amount">{formatCurrency(display.balance)}</span>
            <span>Saldo</span>
          </div>
        </div>
        <div className="filters">
          <Dropdown
            nameField="type"
            state={filtersState}
            options={options.map((filtersState) =>
              filtersState.value === ""
                ? { value: filtersState.value, name: "Todas" }
                : filtersState
            )}
            label="Tipo"
            onSelect={onChangeFilter}
          />
          <Dropdown
            nameField="category"
            state={filtersState}
            options={optionsCategoryFilter}
            label="Categoria"
            onSelect={onChangeFilter}
          />
        </div>
        <div className="data">
          <ul>
            {dataFilteredState.map((stt) => (
              <li key={stt.guid}>
                <div className="identify">
                  {stt.type == 0 ? (
                    <img src={saveMoneyIcon} alt="Icone Carteira" />
                  ) : (
                    <img src={exitMoneyIcon} alt="Icone Saida" />
                  )}
                  <div>
                    <span className="title">{stt.title}</span>
                    <span className="date">
                      {format(new Date(stt.date), "dd/MM/yyyy hh:mm")}
                    </span>
                  </div>
                </div>
                <span className="type">
                  {options.find((op) => op.value == stt.type).name}
                </span>
                <span className="category">{stt.category}</span>
                <span className="amount">{stt.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Balance;
