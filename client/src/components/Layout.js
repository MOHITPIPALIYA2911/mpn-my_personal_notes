import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import LeftSidebar from "./sidebar/LeftSidebar";
const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper layout-content-navbar  ">
      <div className="layout-container">
        <LeftSidebar />
        <div className="layout-page">
          <Header />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              {children}
            </div>
            <Footer />
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
      <div className="drag-target"></div>
    </div>
  );
};

export default Layout;
