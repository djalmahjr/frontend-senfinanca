import { useState, useEffect } from "react";
import { formatCurrency } from "../../utils";
import { useGlobalState } from "../../hooks/useGlobalState";

function Display() {
  const [display, setDisplay] = useState({
    totalEntry: 0,
    totalExit: 0,
    balance: 0,
  });

  const { dataState } = useGlobalState();

  useEffect(() => {
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
  );
}

export default Display;
