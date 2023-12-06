import React, { useState } from "react";

const Navbar = () => {
  const [isAsideClosed, setAsideClosed] = useState(true);

  const handleToggleClick = () => {
    setAsideClosed(!isAsideClosed);
  };

  const handleOutsideClick = (e) => {
    if (e.target.closest("aside") === null) {
      setAsideClosed(true);
    }
  };

  return (
    <>
      <header />
      <div className="container">
        <aside className={isAsideClosed ? "close" : ""}>
          <button className="toggle" onClick={handleToggleClick}>
            |||
          </button>
          <h1>Menu</h1>
          <nav>
            <ul>
              <li>
                
                <a href="/"><i class="fa fa-bar-chart" aria-hidden="true"></i>  Dashboard </a>
              </li>
              <li></li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
