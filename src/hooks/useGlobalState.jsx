import { createContext, useState, useContext } from "react";
import { v4 as uuid } from "uuid";

export const GlobalContext = createContext({});

function GlobalProvider({ children }) {
  const [dataState, setDataState] = useState([]);

  const loadDataState = () => {
    const state = localStorage.getItem("@dataState");
    setDataState(JSON.parse(state));
  };

  const updateDataState = (item) => {
    const state = [
      ...dataState,
      { ...item, guid: uuid(), date: new Date().toISOString() },
    ];

    localStorage.setItem("@dataState", JSON.stringify(state));
    setDataState(state);
  };

  return (
    <GlobalContext.Provider
      value={{
        dataState,
        setDataState,
        loadDataState,
        updateDataState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalState = () => useContext(GlobalContext);

export default GlobalProvider;
