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
  const [cancelledParcels, setCancelledParcels] = useState([]);
  const [totalCODAmount, setTotalCODAmount] = useState(0);

  useEffect(() => {
    const fetchTotalCODAmount = async () => {
      try {
        const response = await fetch("http://localhost:3001/totalcodamount");
        const data = await response.json();
        setTotalCODAmount(data.totalCODAmount);
        console.log("Total COD Amount:", data.totalCODAmount);
        console.log(data);
      } catch (error) {
        console.error("Error fetching total COD amount:", error);
      }
    };

    fetchTotalCODAmount();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getshipments")
      .then((shipmentResponse) => {
        let userData = JSON.parse(localStorage.getItem("loginToken"));
        const userIDForData = userData.userInfo._id;
        const data = shipmentResponse.data;
        const isAdmin = userData.userInfo.role;

        // Update state variables with filtered data
        setTotalParcels(
          isAdmin === "Client"
            ? data.filter((item) => item.client == userIDForData)
            : data.filter((item) => item)
        );
        setDeliveredParcels(
          isAdmin === "Client"
            ? data.filter(
                (item) =>
                  item.parcel === "Delivered" && item.client == userIDForData
              )
            : data.filter((item) => item.parcel === "Delivered")
        );
        setInTransitParcels(
          isAdmin === "Client"
            ? data.filter(
                (item) =>
                  item.parcel === "In Transit" && item.client == userIDForData
              )
            : data.filter((item) => item.parcel === "In Transit")
        );
        setReturnedParcels(
          isAdmin === "Client"
            ? data.filter(
                (item) =>
                  item.parcel === "Returned" && item.client == userIDForData
              )
            : data.filter((item) => item.parcel === "Returned")
        );
        setCancelledParcels(
          isAdmin === "Client"
            ? data.filter(
                (item) =>
                  item.parcel === "Cancelled" && item.client == userIDForData
              )
            : data.filter((item) => item.parcel === "Cancelled")
        );
      })
      .catch((error) => {
        console.error("Error fetching shipment data:", error);
      });
  }, [
    totalParcels,
    deliveredParcels,
    inTransitParcels,
    returnedParcels,
    cancelledParcels,
  ]); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-lg-2">
            <Navbar />
          </div>
          <div className="col-lg-10">
            {/* Total Sales Card */}
            <div className="row  mb-4">
            <div class="kpi-card red2">
              <span class="card-value">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "AED",
                }).format(totalCODAmount)}
              </span>
              <span class="card-text2">Total Sales</span>
              <i class="fa fa-shopping-cart icon2" aria-hidden="true"></i>
            </div>
            </div>

            {/* Parcel Statistics Cards */}
            <div className="row justify-content-center align-items-center column-gap-sm-3">
              <div className="col-lg-2-5">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\box.png" alt="" />
                  <h2>{totalParcels.length}</h2>
                  <p>Total Parcels</p>
                </div>
              </div>
              <div className="col-lg-2-5">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\delivery-truck.png" alt="" />
                  <h2>{deliveredParcels.length}</h2>
                  <p>Delivered</p>
                </div>
              </div>
              <div className="col-lg-2-5">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\reload.png" alt="" />
                  <h2>{inTransitParcels.length}</h2>
                  <p>In Transit</p>
                </div>
              </div>
              <div className="col-lg-2-5">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\restart.png" alt="" />
                  <h2>{returnedParcels.length}</h2>
                  <p>Returned</p>
                </div>
              </div>
              <div className="col-lg-2-5">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\prohibition.png" alt="" />
                  <h2>{cancelledParcels.length}</h2>
                  <p>Cancelled</p>
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
