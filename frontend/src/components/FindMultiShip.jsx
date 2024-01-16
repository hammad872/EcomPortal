import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";

const FindShip = () => {
  // const [searchBy, setSearchBy] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  let userData = JSON.parse(localStorage.getItem("loginToken"));
  const isAdminLoggedIn = userData.userInfo.role;
  const FilteredOrders = searchTerm.length === 0 ? [] : searchTerm.split(",");

  // console.log(FilteredOrders)
  const values = [];
  FilteredOrders.forEach((e) => {
    values.push(e);
  });

  console.log(values);

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

      // Use filter with a proper return statement
    } catch (error) {
      console.error("Error fetching shipments:", error.message);
    }
  };

  // console.log(shipments)

  const handleSearch = () => {
    if (!searchTerm) {
      // If searchTerm is empty, reset filteredShipments to all shipments
      setFilteredShipments(shipments);
      return;  
    }

    const userIDForData = userData.userInfo._id;
    const orders = searchTerm
      .split(",")
      .map((order) => order.trim().toLowerCase());

    const filteredResults = shipments.filter((shipment) => {
      const matchesSearchTerm = orders.includes(shipment.orderID.toLowerCase());
      // Optionally, you can add other conditions here if needed.
      const matchesUserID = shipment.client === userIDForData;
      if (userData.userInfo.role === "Client") {
        return matchesSearchTerm && matchesUserID;
      } else {
        return matchesSearchTerm;
      }
    });

    console.log("Filtered Results:", filteredResults);

    if (filteredResults.length === 0) {
      // Show SweetAlert when no shipments are found
      Swal.fire({
        icon: "error",
        title: "Shipment Not Found",
        text: "No shipments match the search criteria.",
      });
    }

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
          <div className="col-lg-8 py-5">
            <div className="row">
              <div className="col-lg-12">
                <div className="auth-div mt-5">
                  <img src="\assets\logo-black.png" alt="" />
                  <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex-column">
                      <label>Search By Order Number </label>
                      <div
                        className="alert p-2 alert-primary text-sm-center"
                        role="alert"
                      >
                        <p>
                          Enter Order Numbers by (,) comma seperated <br />
                          <em>eg., XXXX, XXX, XXX</em>
                        </p>
                      </div>
                    </div>
                    <div className="flex-column">
                      <label>Enter Here</label>
                    </div>
                    <div className="inputForm">
                      <input
                        className="input"
                        type="text"
                        placeholder={"eg., XXXX, XXX, XXX"}
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
