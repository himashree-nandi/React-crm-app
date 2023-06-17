import React, { useContext } from "react";
import {
  CNavItem,
  CSidebar,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import { Logout } from "../handlers/Logout";
import { ThemeContext } from "../App";
export default function Sidebar() {
  const onChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const value = useContext(ThemeContext);
  const { theme, setTheme } = value;
  return (
    <div>
      <CSidebar
        unfoldable
        className={theme === "light" ? "bg-dark vh-100" : "bg-black vh-100"}
      >
        <i className="bi bi-people-fill m-4"></i>
        <i className="mb-2 bg-white text-dark ">C.R.M </i>
        <CSidebarNav>
          <CNavItem href="#">
            <i className="bi bi-bar-chart-fill"></i>
          </CNavItem>
          <CNavItem href="#">
            <i className="bi bi-house"></i>
            <div className="text-white mx-5 text-decoration-none">Home</div>
          </CNavItem>
          <div onClick={Logout}>
            <CNavItem style={{ cursor: "pointer" }} href="/">
              <i className="bi bi-arrow-bar-left"></i>
              <div className="text-white mx-5 text-decoration-none">Logout</div>
            </CNavItem>
          </div>
          <CNavItem href="#" onClick={onChangeTheme}>
            <i
              className={
                theme === "light" ? "bi bi-sun-fill " : "bi bi-moon-fill"
              }
            ></i>
            <div className="text-white mx-5 text-decoration-none">{theme}</div>
          </CNavItem>
        </CSidebarNav>
        <CSidebarToggler />
      </CSidebar>
    </div>
  );
}
