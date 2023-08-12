import { Outlet } from "react-router-dom";
import Menu from "../menu";

function Layout() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}

export default Layout;
