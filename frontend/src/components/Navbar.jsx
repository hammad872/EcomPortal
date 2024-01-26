import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen2, setDropdownOpen2] = useState(false);

  const toggleDropdown = (event) => {
    setDropdownOpen(!isDropdownOpen);
  
    // Toggle the "active-sidenav" class on the clicked element
    event.currentTarget.querySelector('a').classList.toggle("active-sidenav");
    event.currentTarget.querySelector('i.fa-caret-right').classList.toggle("rotate");


  };
  
  

  const toggleDropdown2 = (event) => {
    setDropdownOpen2(!isDropdownOpen2);

    event.currentTarget.querySelector('a').classList.toggle("active-sidenav");
    event.currentTarget.querySelector('i.fa-caret-right').classList.toggle("rotate");

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
              <p className="text-white text-center text-uppercase fw-bold">
                {innerUsername}
              </p>
              <p className="text-white text-center">{innerRole}</p>
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
              <li className="" onClick={toggleDropdown}>
                <a className="dropdown-main">
                <i class="fa fa-plane" aria-hidden="true"></i>

                  &nbsp;Shipment Entry&nbsp;&nbsp;
                  <i class="fa fa-caret-right" aria-hidden="true"></i>
                </a>
                {isDropdownOpen && (
                  <ul className="dropdown-inner">
                    <li>
                      <a href="/add-new" className="hover:text-red-500 text-sm hover:ps-8 ">
                        <i class="fa fa-plus-square-o" aria-hidden="true"></i>
                        &nbsp; Add New Shipment
                      </a>
                    </li>
                    <li>
                      <a href="/import" className="hover:text-red-500 text-sm hover:ps-8 ">
                        <i class="fa fa-upload"  aria-hidden="true"></i>&nbsp;
                        Import Shipment
                      </a>
                    </li>
                    <li>
                      <a href="/find-shipment" className="hover:text-red-500 text-sm hover:ps-8 ">
                        {" "}
                        <i class="fa fa-search"  aria-hidden="true"></i> &nbsp;
                        Find Shipment
                      </a>
                    </li>
                    <li>
                      <a href="/find-multi-shipment" className="hover:text-red-500 text-sm hover:ps-8 ">
                        {" "}
                        <i class="fa fa-users"  aria-hidden="true"></i> &nbsp;
                        Find Multiple Shipments
                      </a>
                    </li>
                    <li>
                      <a href="/change-status" className="hover:text-red-500 text-sm hover:ps-8 ">
                        {" "}
                        <i class="fa fa-users"  aria-hidden="true"></i> &nbsp;
                        Change Status
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              {isUserAdmin.userInfo.role === "Admin" && (
                <li className="" onClick={toggleDropdown2}>
                  <a className="dropdown-main">
                  <i class="fa fa-th-large" aria-hidden="true"></i>
                    &nbsp;
                    Product Entry&nbsp;&nbsp;
                    <i class="fa fa-caret-right" aria-hidden="true"></i>
                  </a>
                  {isDropdownOpen2 && (
                    <ul className="dropdown-inner">
                      <li>
                        <a href="/add-product" className="hover:text-red-500 text-sm hover:ps-8 "> <i class="fa fa-plus-square-o" aria-hidden="true"></i>
                        &nbsp;Add New Product</a>
                      </li>
                      <li>
                        <a href="/product-table" className="hover:text-red-500 text-sm hover:ps-8 ">Products</a>
                      </li>
                    </ul>
                  )}
                </li>
              )}
              <li onClick={handleLogout}>
                <a className="dropdown-main">
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
