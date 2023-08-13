import { Outlet } from "react-router-dom";
import Menu from "../menu";
import "./layout.css";

function Layout() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}

export default Layout;
