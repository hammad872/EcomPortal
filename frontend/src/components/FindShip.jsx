import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";

const FindShip = () => {
  const [searchBy, setSearchBy] = useState("--Select a Field--");
  const [searchTerm, setSearchTerm] = useState("");
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  let userData = JSON.parse(localStorage.getItem("loginToken"));
  const isAdminLoggedIn = userData.userInfo.role;
  useEffect(() => {
    // Fetch initial shipments when the component mounts
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await axios.get("https://ecomapi-owct.onrender.com/getshipments");

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }

      setShipments(response.data);
    } catch (error) {
      console.error("Error fetching shipments:", error.message);
    }
  };

  const handleSearch = () => {
    if (!searchTerm || searchBy === "--Select a Field--") {
      // If searchTerm is empty or no specific field is selected, show a warning
      Swal.fire({
        icon: 'warning',
        title: 'Select Field and Enter Search Term',
        text: 'Please select a valid field and enter a search term.',
      });
      return;
    }
  
    const userIDForData = userData.userInfo._id;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
    const filteredResults = shipments.filter((shipment) => {
      console.log(shipments)
      let matchesSearchTerm = false;
      let matchesUserID = false;

      if (searchBy === 'Order Number' && shipment.orderID) {
        matchesSearchTerm = shipment.orderID.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (searchBy === 'Receiver Name' && shipment.receiverName) {
        matchesSearchTerm = shipment.receiverName.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (searchBy === 'Client Name' && shipment.clientName) {
        matchesSearchTerm = shipment.clientName.toLowerCase().includes(lowerCaseSearchTerm);
      }
  
      if (shipment.client) {
        matchesUserID = shipment.client === userIDForData;
      }
  
      if (userData.userInfo.role === 'Client') {
        return matchesSearchTerm && matchesUserID;
      } else {
        return matchesSearchTerm;
      }
    });
  
    console.log('Filtered Results:', filteredResults);
  
    if (filteredResults.length === 0) {
      // Show SweetAlert when no shipments are found based on the selected field
      Swal.fire({
        icon: 'error',
        title: 'Shipment Not Found',
        text: `No shipments found for ${searchBy}.`,
      });
    }
  
    setFilteredShipments(filteredResults);
  };

  const columns = [
    { field: "orderID", headerName: "Order #", width: 80 },
    { field: "receiverName", headerName: "Receiver Name", width: 200 },
    { field: "city", headerName: "City", width: 130 },
    { field: "customerEmail", headerName: "Customer Email", width: 200 },
    { field: "customerAddress", headerName: "Customer Address", width: 250 },
    { field: "parcel", headerName: "Parcel Status", width: 130 },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      type: "string",
      width: 150,
    },
    {
      field: "codAmount",
      headerName: "COD Amount",
      type: "number",
      width: 150,
    },
    {
      field: "date",
      headerName: "Data Of Order",
      type: Date,
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
          <div className="col-lg-8 py-5">
            <div className="row">
              <div className="col-lg-12">
                <div className="auth-div mt-5">
                  <img src="\assets\logo-black.png" alt="" />
                  <form className="form" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex-column">
                      <div
                        className="alert p-2 alert-primary text-sm-center"
                        role="alert"
                      >
                        <p>
                        Select and Enter The Field To Find Shipment
                        </p>
                      </div>
                    </div>
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
                      <option value="--Select a Field--">
                        --Select a Field--
                      </option>
                      <option value="Order Number">Order Number</option>
                      <option value="Receiver Name">Receiver Name</option>
                      {isAdminLoggedIn === "Admin" ? (
                        <option value="Client Name">Client Name</option>
                      ) : (
                        []
                      )}
                    </select>
                    <div className="flex-column">
                      <label>Enter Here</label>
                    </div>
                    <div className="inputForm">
                      <input
                        className="input"
                        type="text"
                        placeholder={
                          searchBy === "--Select a Field--"
                            ? "--Please Select a Field--"
                            : `Enter ${searchBy} here`
                        }
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button className="button-submit" onClick={handleSearch}>
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
            {filteredShipments.length > 0 && (
              <div
                style={{
                  height: 400,
                  width: "100%",
                  marginTop: "7%",
                  marginBottom: "5%",
                }}
              >
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
      </div>
    </>
  );
};

export default FindShip;
