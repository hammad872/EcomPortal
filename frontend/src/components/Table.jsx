import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from 'axios';

const Table = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [shipmentData, setShipmentData] = useState([]);

  useEffect(() => {
    // Fetch shipment data from the server
    axios.get('http://localhost:3001/getshipments')
      .then(response => {
        setShipmentData(response.data);
      })
      .catch(error => {
        console.error('Error fetching shipment data:', error);
      });
  }, []);

  const columns = [
    { field: "reference", headerName: "Reference", width: 130 },
    { field: "receiverName", headerName: "Receiver Name", width: 200 },
    { field: "city", headerName: "City", width: 130 },
    { field: "customerEmail", headerName: "Customer Email", width: 200 },
    { field: "customerAddress", headerName: "Customer Address", width: 250 },
    { field: "contactNumber", headerName: "Contact Number", type: "number", width: 150 },
    { field: "codAmount", headerName: "COD Amount", type: "number", width: 150 },
  ];

  return (
    <div className="container">
      <div className="mt-4">
        <div className="custom-tabs">
          <button className="custom-button" onClick={() => setActiveTab("tab1")}>
            Tab 1
          </button>
          <button className="custom-button" onClick={() => setActiveTab("tab2")}>
            Tab 2
          </button>
          <button className="custom-button" onClick={() => setActiveTab("tab3")}>
            Tab 3
          </button>
        </div>

        {activeTab === "tab1" && (
          <div id="tab1" style={{ height: 400, width: "100%" }} className="mt-4">
            <DataGrid
              rows={shipmentData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        )}

        {/* Repeat the above structure for tab2 and tab3 with appropriate conditions */}
      </div>
    </div>
  );
};

export default Table;
