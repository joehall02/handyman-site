import React, { useState } from "react";

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false); // State to store the toggle status of the navbar

  // Function to handle the toggle of the navbar
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleNavLinkClick = () => {
    setNavbarOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="#home" onClick={handleNavLinkClick}>
          Handyman-site
        </a>
        <button className="navbar-toggler" type="button" onClick={handleToggle} aria-controls="navbarNav" aria-expanded={navbarOpen ? "true" : "false"} aria-label="Toggle navigation">
          {navbarOpen ? <i className="bi bi-x-lg toggle-icon" /> : <i className="bi bi-list toggle-icon" />}
        </button>
        <div className={`collapse navbar-collapse ${navbarOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav d-flex justify-content-end align-items-end ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#services" onClick={handleNavLinkClick}>
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#gallery" onClick={handleNavLinkClick}>
                Gallery
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about" onClick={handleNavLinkClick}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={handleNavLinkClick}>
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={handleNavLinkClick}>
                <i className="bi bi-instagram"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={handleNavLinkClick}>
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
