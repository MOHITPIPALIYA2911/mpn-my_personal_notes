import React from "react";
import adminImg from "../../assetsCon/assets/img/avatars/1.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function logout() {
    window.location.href = "/login";
    // sessionStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  }
  return (
    <>
      <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0   d-xl-none ">
          <a className="nav-item nav-link px-0 me-xl-4">
            <i className="mdi mdi-menu mdi-24px"></i>
          </a>
        </div>
        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          <div className="navbar-nav align-items-center">
            <div className="nav-item navbar-search-wrapper mb-0">
              <a className="nav-item nav-link search-toggler fw-normal px-0">
                <i className="mdi mdi-magnify mdi-24px scaleX-n1-rtl"></i>
                <span className="d-none d-md-inline-block text-muted"> Search </span>
              </a>
            </div>
          </div>
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item navbar-dropdown dropdown-user dropdown select-none">
              <a className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                <div className="avatar avatar-online">
                  <img src={adminImg} className="w-px-40 h-auto rounded-circle" />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      navigate(`/viewaccount`);
                    }}
                  >
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img src="../../assets/img/avatars/1.png" className="w-px-40 h-auto rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-medium d-block">{localStorage.username !== "undefined" ? localStorage.username : ""}</span>
                        <small className="text-muted">{localStorage.email !== "undefined" ? localStorage?.email : ""}</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>

                {/* in progress 30-04-24 */}
                {/* <li>
                  <a className="dropdown-item" onClick={() => (window.location.href = "/settings")}>
                    <i className="mdi mdi-cog-outline me-2"></i>
                    <span className="align-middle">Change Password</span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                 */}
                <li>
                  <a className="dropdown-item" onClick={() => logout()}>
                    <i className="mdi mdi-logout me-2"></i>
                    <span className="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* <div className="navbar-search-wrapper search-input-wrapper  d-none">
          <input type="text" className="form-control search-input container-xxl border-0" placeholder="Search..." aria-label="Search..." />
          <i className="mdi mdi-close search-toggler cursor-pointer"></i>
        </div> */}
      </nav>
    </>
  );
};

export default Header;
