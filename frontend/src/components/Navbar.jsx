import React from "react";

const Navbar = () => {

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
                <i className="fa fa-bar-chart" aria-hidden="true"></i> Dashboard
              </a>
            </li>
            <li>
              <a href="/add-new">
                Add New
              </a>
            </li>
            <li>
              <a href="/import">
                Import 
              </a>
            </li>
          </ul>
        </nav>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
