import React, { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header />
      <div className="container">
        <aside className="close">
          <a href="/dashboard">
            <img src="\assets\logo.png" alt="" />
          </a>
          <nav>
            <ul>
              <li>
                <a href="/dashboard">
                  <i className="fa fa-bar-chart" aria-hidden="true"></i>{" "}
                  Dashboard
                </a>
              </li>
              <li onClick={toggleDropdown}>
                <a className="dropdown">
                  Shipment Entry{" "}
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </a>
                {isDropdownOpen && (
                  <ul className="dropdown">
                    <li>
                      <a href="/add-new">Add New Page</a>
                    </li>
                    <li>
                      <a href="/import">Import Page</a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
