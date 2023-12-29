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
  const [selectedUserData, setSelectedUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getshipments")
      .then((shipmentResponse) => {
        // console.log(selectedUserData)
        const data = shipmentResponse.data;
        // console.log(JSON.stringify(...data))
        // console.log(selectedUserData)
        selectedUserData.filter((item) =>{
          // console.log(item.client)
        })
        

        console.log(selectedUserData.client)
        let userData = JSON.parse(localStorage.getItem("loginToken"));
        const userIDForData = userData.userInfo._id;
        console.log(userIDForData)
        setTableData({
          tab1: data.filter((item) => item.client == userIDForData ),
          // tab1: data.filter((item) => console.log(item , selectedUserData.client) ),
          tab2: data.filter((item) => item.parcel === "Delivered"),
          tab3: data.filter((item) => item.parcel === "In Transit"),
          tab4: data.filter((item) => item.parcel === "Returned"),
        });
      })
      .catch((error) => {
        console.error("Error fetching shipment data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedUserData]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/getUserId")
  //     .then((dataFromBackend) => {
  //       let myData = dataFromBackend.data;
  //       let userData = JSON.parse(localStorage.getItem("loginToken"));
  //       const userIDForData = userData.userInfo._id;
  //       let hanbhaiarhaHaiNa = myData.filter((item) => item.client === userIDForData);
        
  //       // Store all matched items in the state
  //       setSelectedUserData(hanbhaiarhaHaiNa);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);
  


  const columns = [
    { field: "reference", headerName: "Reference", width: 130 },
    { field: "receiverName", headerName: "Receiver Name", width: 200 },
    { field: "city", headerName: "City", width: 130 },
    { field: "customerEmail", headerName: "Customer Email", width: 200 },
    { field: "customerAddress", headerName: "Customer Address", width: 250 },
    { field: "parcel", headerName: "Parcel Status", width: 130},
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
                  bottom: "10%",
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
