import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";

const FindShip = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(""); // Added state for selected status
  let userData = JSON.parse(localStorage.getItem("loginToken"));

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
      const matchesSearchTerm = orders.includes(
        shipment.orderID.toLowerCase()
      );
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

  const handleStatusChange = async () => {
    if (!selectedStatus) {
      Swal.fire({
        icon: "warning",
        title: "Select Status",
        text: "Please select a status to update the shipment.",
      });
      return;
    }

    // Assuming you want to change the status of all filtered shipments
    const orderIdsToUpdate = filteredShipments.map((shipment) => shipment.orderID);

    try {
      const response = await axios.patch(
        "https://ecomapi-owct.onrender.com/changestatus",
        { newStatus: selectedStatus, orderIds: orderIdsToUpdate }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Status Changed",
          text: "Shipment status has been updated successfully.",
        });

        // Refetch shipments after status change
        fetchShipments();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating the shipment status.",
        });
      }
    } catch (error) {
      console.error("Error changing shipment status:", error.message);
    }
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
                      <label>Search By Order Number </label>
                      <div
                        className="alert p-2 alert-primary text-sm-center"
                        role="alert"
                      >
                        <p>
                          Enter Order Numbers by (,) comma separated <br />
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
                    <div className="flex-column">
                      <label>Change Status</label>
                    </div>
                    <div className="inputForm">
                      <select
                        className="input"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="">Select Status</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Returned">Returned</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Confirmation Pending">Confirmation Pending</option>
                        <option value="In Transit">In Transit</option>
                      </select>
                    </div>
                    <button
                      className="button-submit"
                      type="submit"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                    <button
                      className="button-submit"
                      type="submit"
                      onClick={handleStatusChange}
                    >
                      Change Status
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
