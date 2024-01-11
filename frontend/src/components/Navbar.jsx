import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen2, setDropdownOpen2] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen2(!isDropdownOpen2);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    navigate("/");
  };

  const isUserAdmin = JSON.parse(localStorage.getItem("loginToken"));
  let userData = JSON.parse(localStorage.getItem("loginToken"));
  const [innerUsername, setUser_name] = useState();
  const [innerRole, setUser_Role] = useState();
  const [innerSlug, setUser_slug] = useState();

  useEffect(() => {
    // This code will run when the component mounts
    setUser_name(userData.userInfo.username);
    setUser_Role(userData.userInfo.role);
    setUser_slug(userData.userInfo.slug);
  }, [
    userData.userInfo.username,
    userData.userInfo.role,
    userData.userInfo.slug,
  ]);
  return (
    <>
      <header />
      <div className="container">
        <aside className="close">
          <a href="/dashboard">
            <img src="\assets\logo.png" alt="" />
          </a>
          <div className="shadow profile">
            <div className="profileImage">
              <p> {innerSlug} </p>
            </div>
            <div className="profileText">
              <p className="text-white text-uppercase">{innerUsername}</p>
              <p className="text-white">{innerRole}</p>
            </div>
          </div>
          <nav>
            <ul>
              <li className="mt-5">
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
                    <li>
                      <a href="/find-shipment">Find Shipment</a>
                    </li>
                  </ul>
                )}
              </li>
              {isUserAdmin.userInfo.role === "Admin" && (
                <li onClick={toggleDropdown2}>
                  <a className="dropdown">
                    Product Entry{" "}
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </a>
                  {isDropdownOpen2 && (
                    <ul className="dropdown">
                      <li>
                        <a href="/add-product">Add New Product</a>
                      </li>
                      <li>
                        <a href="/product-table">Products</a>
                      </li>
                    </ul>
                  )}
                </li>
              )}
              <li onClick={handleLogout}>
                <a className="dropdown">
                  <i className="fa fa-sign-out" aria-hidden="true"></i> &nbsp;
                  Log Out
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
