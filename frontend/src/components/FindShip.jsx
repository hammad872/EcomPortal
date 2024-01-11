import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";

const FindShip = () => {
  return (
    <>
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-lg-2">
            <Navbar />
          </div>
          <div className="col-lg-8 py-5">
            <div className="auth-div mt-5">
              <img src="\assets\logo-black.png" alt="" />
              <form className="form">
                <div className="flex-column">
                  <label>Search By</label>
                </div>
                <select
                  id="search"
                  name="search"
                  autoComplete="country-name"
                  className="form-input"
                >
                  <option value="United State">United State</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                </select>
                <div className="flex-column">
                  <label>Enter Here</label>
                </div>
                <div className="inputForm">
                  <input
                    className="input"
                    type="password"
                  />
                </div>
                <button className="button-submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindShip;
