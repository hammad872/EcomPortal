import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

const ProductTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getproducts");
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/deleteproduct/${productId}`);
      setTableData((prevData) =>
        prevData.filter((product) => product._id !== productId)
      );
      Swal.fire({
        icon: "success",
        title: "Product Deleted",
        text: "Product has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error deleting product. Please try again later.",
      });
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  const updateProduct = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/editproduct/${selectedProduct._id}`,
        {
          productTitle: selectedProduct.productTitle,
          sourcing: selectedProduct.sourcing,
        }
      );
      const updatedProduct = response.data;
      setTableData((prevData) =>
        prevData.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
      Swal.fire({
        icon: "success",
        title: "Product Updated",
        text: "Product has been updated successfully.",
      });
      closeEditModal();
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating product. Please try again later.",
      });
    }
  };

  const columns = [
    { field: "productTitle", headerName: "Product Title", width: 200 },
    { field: "sourcing", headerName: "Sourcing", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            <button
              onClick={() => openEditModal(params.row)}
              className="edit-button mr-4"
            >
              <svg class="edit-svgIcon" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </button>
            <button
              onClick={() =>
                confirmDelete(params.row._id, params.row.productTitle)
              }
              variant="contained"
              className="delete-button"
            >
              <svg class="delete-svgIcon" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
              </svg>
            </button>
          </div>
        );
      },
    },
  ];

  const confirmDelete = (productId, productTitle) => {
    Swal.fire({
      title: "Delete Product?",
      text: `Are you sure you want to delete the product "${productTitle}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId);
      }
    });
  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-lg-2">
            <Navbar />
          </div>
          <div className="col-lg-10 p-5">
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
                    getRowId={(row) => row._id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      <Modal open={isEditModalOpen} onClose={closeEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h3>Edit Product</h3>
          <TextField
            fullWidth
            label="Product Title"
            value={selectedProduct?.productTitle || ""}
            onChange={(e) =>
              setSelectedProduct((prev) => ({
                ...prev,
                productTitle: e.target.value,
              }))
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Sourcing"
            value={selectedProduct?.sourcing || ""}
            onChange={(e) =>
              setSelectedProduct((prev) => ({
                ...prev,
                sourcing: e.target.value,
              }))
            }
            margin="normal"
          />
          <Button
            variant="contained"
            onClick={updateProduct}
            style={{ marginTop: "10px" }}
          >
            Update Product
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProductTable;
