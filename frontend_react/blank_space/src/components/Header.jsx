import React from "react";
import { useContext } from "react";
import { UserContext } from "../context";
 
const Header = () => {
  const userName = useContext(UserContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" id="home-icon">
            <i className="fa-solid fa-calendar-days"></i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="index.html">
                Home
              </a>
              <a className="nav-link" href="dashborad.html">
                Dashboard
              </a>
            </div>
          </div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" id="navbar-usericon">
                  <i className="fa-solid fa-user"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" id="navbar-username">
                  {userName}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
