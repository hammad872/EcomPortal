import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const FindShip = () => {
  const [searchBy, setSearchBy] = useState("Order Number");
  const [searchTerm, setSearchTerm] = useState("");
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  let userData = JSON.parse(localStorage.getItem("loginToken"));
  useEffect(() => {
    // Fetch initial shipments when the component mounts
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getshipments");

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }

      setShipments(response.data);
    } catch (error) {
      console.error("Error fetching shipments:", error.message);
    }
  };

  const handleSearch = () => {
    if (!searchTerm) {
      // If searchTerm is empty, reset filteredShipments to all shipments
      setFilteredShipments(shipments);
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredResults = shipments.filter((shipment) => {
      switch (searchBy) {
        case "Order Number":
          return shipment.orderID.toLowerCase().includes(lowerCaseSearchTerm);
        case "Reference":
          return shipment.reference.toLowerCase().includes(lowerCaseSearchTerm);
        case "ClientName":
          return shipment.clientName
            .toLowerCase()
            .includes(lowerCaseSearchTerm);
        default:
          return false;
      }
    });

    console.log("Filtered Results:", filteredResults); // Add this line to log the filtered results

    setFilteredShipments(filteredResults);
  };

  const columns = [
    { field: "orderID", headerName: "Order #", width: 80 },
    { field: "reference", headerName: "Reference", width: 130 },
    { field: "receiverName", headerName: "Receiver Name", width: 200 },
    { field: "city", headerName: "City", width: 130 },
    { field: "customerEmail", headerName: "Customer Email", width: 200 },
    { field: "customerAddress", headerName: "Customer Address", width: 250 },
    { field: "parcel", headerName: "Parcel Status", width: 130 },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      type: "number",
      width: 150,
    },
    {
      field: "codAmount",
      headerName: "COD Amount",
      type: "number",
      width: 150,
    },
    {
      field: "timestamps",
      headerName: "Created At",
      width: 200,
    },
    ...(userData.userInfo.role === "Admin"
      ? [
          {
            field: "clientName",
            headerName: "Client Name",
            width: 200,
          },
        ]
      : []),
  ];

  return (
    <>
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-lg-3">
            <Navbar />
          </div>
          <div className="col-lg-6 py-5">
            <div className="auth-div mt-5">
              <img src="\assets\logo-black.png" alt="" />
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="flex-column">
                  <label>Search By</label>
                </div>
                <select
                  id="search"
                  name="search"
                  autoComplete="country-name"
                  className="form-input"
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                >
                  <option value="Order Number">Order Number</option>
                  <option value="Reference">Reference</option>
                  <option value="ClientName">Client Name</option>
                </select>
                <div className="flex-column">
                  <label>Enter Here</label>
                </div>
                <div className="inputForm">
                  <input
                    className="input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="button-submit" onClick={handleSearch}>
                  Search
                </button>
              </form>

              {filteredShipments.length > 0 && (
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={filteredShipments}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </>
  );
};

export default FindShip;
