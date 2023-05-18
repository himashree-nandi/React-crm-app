import React from "react";
import {
  CNavItem,
  CSidebar,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
export default function Sidebar() {
 const logOut=()=>{
  localStorage.clear();
  window.location.href="/";
 }
  return (
    <div>
      <CSidebar unfoldable className="vh-100 bg-black">
        <CSidebarNav>
          <CNavItem href="#" className="bg-dark">
            <i className="bi bi-bar-chart-fill"></i>
          </CNavItem>
          <CNavItem href="#">
            <i className="bi bi-house"></i>
            <div className="text-white mx-5 text-decoration-none">Home</div>
          </CNavItem>
          <div onClick={logOut}>
            <CNavItem href="#">
              <i className="bi bi-arrow-bar-left"></i>
              <div className="text-white mx-5 text-decoration-none" >Logout</div>
            </CNavItem>
          </div>
        </CSidebarNav>
        <CSidebarToggler />
      </CSidebar>
    </div>
  );
}
