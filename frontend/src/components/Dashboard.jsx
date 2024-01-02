import Navbar from "./Navbar";
import axios from "axios";
import Table from "./Table";
import Header from "./Header";
import React, { useState, useEffect } from "react";

const Dashboard = () => {

  const [totalParcels, setTotalParcels] = useState([]);
  const [deliveredParcels, setDeliveredParcels] = useState([]);
  const [inTransitParcels, setInTransitParcels] = useState([]);
  const [returnedParcels, setReturnedParcels] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getshipments")
      .then((shipmentResponse) => {
        let userData = JSON.parse(localStorage.getItem("loginToken"));
        const userIDForData = userData.userInfo._id;
        const data = shipmentResponse.data;
        const isAdmin = userData.userInfo.role;

        // Update state variables with filtered data
        setTotalParcels(isAdmin === "Client" ?  data.filter((item) => item.client == userIDForData) : data.filter((item) => item ));
        setDeliveredParcels(
          isAdmin === "Client" ? 
          data.filter(
            (item) => item.parcel === "Delivered" && item.client == userIDForData
          ) :
          data.filter(
            (item) => item.parcel === "Delivered" )
        );
        setInTransitParcels(
          isAdmin === "Client" ? 
          data.filter(
            (item) => item.parcel === "In Transit" && item.client == userIDForData
          ):
          data.filter(
            (item) => item.parcel === "In Transit" )
        );
        setReturnedParcels(
          isAdmin === "Client" ?
          data.filter(
            (item) => item.parcel === "Returned" && item.client == userIDForData
          ):
          data.filter(
            (item) => item.parcel === "Returned" )
        );
      })
      .catch((error) => {
        console.error("Error fetching shipment data:", error);
      });
  }, [totalParcels, deliveredParcels, inTransitParcels, returnedParcels]); // Empty dependency array means this effect runs once when the component mounts

  
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
                  <h2>{totalParcels.length}</h2>
                  <p>Total Parcels</p>
                </div>
              </div>
              <div className="col-lg-3  ">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\delivery-truck.png" alt="" />
                  <h2>{deliveredParcels.length}</h2>
                  <p>Delivered</p>
                </div>
              </div>
              <div className="col-lg-3  ">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\reload.png" alt="" />
                  <h2>{inTransitParcels.length}</h2>
                  <p>In Transit</p>
                </div>
              </div>
              <div className="col-lg-3  ">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\restart.png" alt="" />
                  <h2>{returnedParcels.length}</h2>
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
