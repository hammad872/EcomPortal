import React from "react";
import Navbar from "./Navbar";
import Table from "./Table";
import Header from "./Header";

const Dashboard = () => {


  return (
    <>
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-lg-2">
            <Navbar />
          </div>
          <div className="col-lg-10">
            <div className="row justify-content-center column-gap-sm-3">
              <div className="col-lg-3  ">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\box.png" alt="" />
                  <h2>200</h2>
                  <p>Total Parcels</p>
                </div>
              </div>
              <div className="col-lg-3  ">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\delivery-truck.png" alt="" />
                  <h2>200</h2>
                  <p>Delivered</p>
                </div>
              </div>
              <div className="col-lg-3  ">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\reload.png" alt="" />
                  <h2>200</h2>
                  <p>In Transit</p>
                </div>
              </div>
              <div className="col-lg-3  ">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\restart.png" alt="" />
                  <h2>200</h2>
                  <p>Returned</p>
                </div>
              </div>
            </div>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
