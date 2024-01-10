import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
// import { json } from "react-router-dom";
const Table = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [tableData, setTableData] = useState({
    tab1: [],
    tab2: [],
    tab3: [],
    tab4: [],
    tab5: [],
  });
  const [loading, setLoading] = useState(true);
  let userData = JSON.parse(localStorage.getItem("loginToken"));
  useEffect(() => {
    axios
      .get("http://localhost:3001/getshipments")
      .then((shipmentResponse) => {
        const data = shipmentResponse.data;
        const userIDForData = userData.userInfo._id;
        const isAdmin = userData.userInfo.role;
        setTableData({
          tab1:
            isAdmin === "Client"
              ? data.filter((item) => item.client === userIDForData)
              : data,
          tab2:
            isAdmin === "Client"
              ? data.filter(
                  (item) =>
                    item.parcel === "Delivered" && item.client === userIDForData
                )
              : data.filter((item) => item.parcel === "Delivered"),
          tab3:
            isAdmin === "Client"
              ? data.filter(
                  (item) =>
                    item.parcel === "In Transit" &&
                    item.client === userIDForData
                )
              : data.filter((item) => item.parcel === "In Transit"),
          tab4:
            isAdmin === "Client"
              ? data.filter(
                  (item) =>
                    item.parcel === "Returned" && item.client === userIDForData
                )
              : data.filter((item) => item.parcel === "Returned"),
          tab5:
            isAdmin === "Client"
              ? data.filter(
                  (item) =>
                    item.parcel === "Cancelled" && item.client === userIDForData
                )
              : data.filter((item) => item.parcel === "Cancelled"),
        });
      })
      .catch((error) => {
        console.error("Error fetching shipment data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const columns = [
  { field: "orderID", headerName: "Order #", width: 150 },
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

  // const [popupInfo , setPopupInfo ] = useState();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleCellClick = (params) => {
    setSelectedRow(params.row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleDeleteShipment = async (e) => {
    // Show SweetAlert confirmation dialog
    const isConfirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this shipment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    });
  
    // If the user confirms the deletion, proceed with the delete request
    if (isConfirmed.value) {
      try {
        const response = await fetch(`http://localhost:3001/deleteshipment/${e}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
          },
        });
  
        const data = await response.json();
        console.log(data);
  
        // Optionally, show a success message
        Swal.fire('Deleted!', 'Your shipment has been deleted.', 'success');
        handleCloseDialog()
      } catch (error) {
        console.error('Error deleting shipment:', error);
        // Show an error message using SweetAlert
        Swal.fire('Error', 'An error occurred while deleting the shipment.', 'error');
      }
    }
    // If the user cancels the deletion, do nothing
  };
  




  const myDataString = JSON.stringify(selectedRow, null, 2);
  const parsedData = JSON.parse(myDataString);
  // console.log(parsedData);

  // Now you can access properties like clientName

  return (
    <div className="container">
      <div className="mt-4">
        <div className="custom-tabs">
          <button
            className="custom-button"
            onClick={() => setActiveTab("tab1")}
          >
            Total Parcel
          </button>
          <button
            className="custom-button"
            onClick={() => setActiveTab("tab2")}
          >
            Delivered
          </button>
          <button
            className="custom-button"
            onClick={() => setActiveTab("tab3")}
          >
            In Transit
          </button>
          <button
            className="custom-button"
            onClick={() => setActiveTab("tab4")}
          >
            Returned
          </button>
          <button
            className="custom-button"
            onClick={() => setActiveTab("tab5")}
          >
            Cancelled
          </button>
        </div>

        {activeTab === "tab1" && (
          <div>
            <div
              id="tab1"
              style={{ height: 400, width: "100%" }}
              className="mt-4"
            >
              {loading ? (
                <CircularProgress
                  style={{
                    left: "50%",
                    position: "absolute",
                    bottom: "30%",
                    color: "#FF6262",
                  }}
                />
              ) : (
                <DataGrid
                  rows={tableData.tab1}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  // checkboxSelection
                  onCellClick={handleCellClick}
                />
              )}
            </div>

            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Shipment Details</DialogTitle>
              <DialogContent>
                {selectedRow && (
                  <div className="text-left">
                    {/* { JSON.stringify(selectedRow, null, 2)} */}
                    <pre>{}</pre>

                    <div className="main-card row py-3">
                    <div className="card-subtitle">
                        <span className="card-title">Order #: </span>
                        <span className="name">{parsedData.orderID}</span>
                      </div>
                      <div className="card-subtitle">
                        <span className="card-title">Reference: </span>
                        <span className="name">{parsedData.reference}</span>
                      </div>
                      <div className="card-subtitle">
                        <span className="card-title">Receiver Name: </span>
                        <span className="name">{parsedData.receiverName}</span>
                      </div>
                      <div className="card-subtitle">
                        <span className="card-title">City: </span>
                        <span className="name">{parsedData.city}</span>
                      </div>
                      <div className="card-subtitle">
                        <span className="card-title">Customer Email: </span>
                        <span className="name">{parsedData.customerEmail}</span>
                      </div>
                      <div className="card-subtitle">
                        <span className="card-title">Customer Address: </span>
                        <p className="name">{parsedData.customerAddress}</p>
                      </div>
                      <div className="card-subtitle">
                        <span className="card-title">Client Name: </span>
                        <span className="name text-uppercase">
                          {parsedData.clientName}
                        </span>
                      </div>
                      <div className="card-subtitle">
                        <span className="card-title">COD Amount: </span>
                        <span className="name">{parsedData.codAmount}</span>
                      </div>
                      <div className="card-subtitle">
                        <span className="card-title">Contact Number: </span>
                        <span className="name">{parsedData.contactNumber}</span>
                      </div>
                      <div className="card-subtitle">
                        <span className="card-title">Parcel Status: </span>
                        <span className="name">{parsedData.parcel}</span>
                      </div>
                      <div className="card-subtitle">
                        <span className="card-title">Products: </span>
                        <span className="name">
                          <ol className="prod-list">
                            {parsedData.productName.map((nestedArray, index) => (
                              <li key={index}>{nestedArray[0].prodName}</li>
                              ))}
                            </ol>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  <span className="text-success fw-bold" >Edit</span>
                </Button>
                <Button onClick={ () => handleDeleteShipment(parsedData.id)} color="secondary">
                  <span className="text-danger fw-bold">Delete</span>
                </Button>
                <Button onClick={handleCloseDialog} color="primary">
                  <span className="text-primary fw-bold">Close</span>
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}

        {activeTab === "tab2" && (
          <div
            id="tab2"
            style={{ height: 400, width: "100%" }}
            className="mt-4"
          >
            {loading ? (
              <CircularProgress
                style={{
                  left: "50%",
                  position: "absolute",
                  bottom: "10%",
                  color: "#FF6262",
                }}
              />
            ) : (
              <DataGrid
                rows={tableData.tab2}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            )}
          </div>
        )}

        {activeTab === "tab3" && (
          <div
            id="tab3"
            style={{ height: 400, width: "100%" }}
            className="mt-4"
          >
            {loading ? (
              <CircularProgress
                style={{
                  left: "50%",
                  position: "absolute",
                  bottom: "10%",
                  color: "#FF6262",
                }}
              />
            ) : (
              <DataGrid
                rows={tableData.tab3}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            )}
          </div>
        )}

        {activeTab === "tab4" && (
          <div
            id="tab4"
            style={{ height: 400, width: "100%" }}
            className="mt-4"
          >
            {loading ? (
              <CircularProgress
                style={{
                  left: "50%",
                  position: "absolute",
                  bottom: "10%",
                  color: "#FF6262",
                }}
              />
            ) : (
              <DataGrid
                rows={tableData.tab4}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            )}
          </div>
        )}
        {activeTab === "tab5" && (
          <div
            id="tab4"
            style={{ height: 400, width: "100%" }}
            className="mt-4"
          >
            {loading ? (
              <CircularProgress
                style={{
                  left: "50%",
                  position: "absolute",
                  bottom: "10%",
                  color: "#FF6262",
                }}
              />
            ) : (
              <DataGrid
                rows={tableData.tab5}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            )}
          </div>
        )}

        {/* Repeat the above structure for tab2 and tab3 with appropriate conditions */}
      </div>
    </div>
  );
};

export default Table;
