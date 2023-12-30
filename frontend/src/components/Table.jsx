import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { json } from "react-router-dom";
const Table = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [tableData, setTableData] = useState({
    tab1: [],
    tab2: [],
    tab3: [],
    tab4: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getshipments")
      .then((shipmentResponse) => {
        const data = shipmentResponse.data;
        // console.log(data.filter((item) => item.timestamps))

        // console.log(selectedUserData.client);
        let userData = JSON.parse(localStorage.getItem("loginToken"));
        const userIDForData = userData.userInfo._id;
        // console.log(userIDForData);
        setTableData({
          tab1:  data.filter((item) => item.client == userIDForData),
          tab2: data.filter(
            (item) =>
              item.parcel === "Delivered" && item.client == userIDForData
          ),
          tab3: data.filter(
            (item) =>
              item.parcel === "In Transit" && item.client == userIDForData
          ),
          tab4: data.filter(
            (item) => item.parcel === "Returned" && item.client == userIDForData
          ),
        });
      })
      .catch((error) => {
        console.error("Error fetching shipment data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
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
  ];

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
        </div>

        {activeTab === "tab1" && (
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
                checkboxSelection
              />
            )}
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

        {/* Repeat the above structure for tab2 and tab3 with appropriate conditions */}
      </div>
    </div>
  );
};

export default Table;
