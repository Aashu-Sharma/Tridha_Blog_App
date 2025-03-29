import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index.js";
import '../App.css'


function Layout() {
  return (
    <div className="layout ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
