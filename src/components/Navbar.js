import React, { useState } from "react";

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false); // State to store the toggle status of the navbar

  // Function to handle the toggle of the navbar
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="#home">
          MyApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {navbarOpen ? <i class="bi bi-x-lg toggle-icon" /> : <i class="bi bi-list toggle-icon" />}
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex justify-content-end align-items-end ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                <i className="bi bi-instagram"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                <i className="bi bi-facebook"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
