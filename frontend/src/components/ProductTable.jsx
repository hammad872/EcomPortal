import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";
// import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";

const ProductTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getproducts")
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "productTitle", headerName: "Product Title", width: 300 },
    { field: "sourcing", headerName: "Sourcing", width: 300 },
    // { field: "createdAt", headerName: "Created At", width: 200 },
  ];

  return (
    <>
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-lg-2">
            <Navbar />
          </div>
          <div className="col-lg-10 p-5" style={{}}>
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                borderRadius: "10px",
                padding: "45px",
                position: "relative",
              }}
            >
              {loading && (
                <CircularProgress
                  style={{
                    left: "50%",
                    position: "absolute",
                    bottom: "30%",
                    color: "#FF6262",
                  }}
                />
              )}
              <div className="Product">
                <div className="space-y-12">
                  <h3>Product Entry</h3>
                  <DataGrid
                    rows={tableData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    getRowId={(row) => row._id} // Specify the custom id property
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTable;