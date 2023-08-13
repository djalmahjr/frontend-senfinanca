import Router from "./Router";
import GlobalProvider from "./hooks/useGlobalState";

function App() {
  return (
    <>
      <GlobalProvider>
        <Router />
      </GlobalProvider>
    </>
  );
}

export default App;
