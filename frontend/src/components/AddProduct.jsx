import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productTitle: "",
    sourcing: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Proceed with adding the product
      const response = await axios.post(
        "https://ecomapi-owct.onrender.com/addproduct",
        formData
      );

      // Handle success, show a success message, or redirect
      Swal.fire({
        icon: "success",
        title: `${formData.productTitle} has been added `,
      });
    } catch (error) {
      // Handle error, show an error message
      console.error("Error adding product:", error);
      Swal.fire("Error", "Failed to add product", "error");
    }
  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-lg-12 p-5" style={{}}>
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                borderRadius: "10px",
                padding: "45px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <h3>Product Entry</h3>
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="productTitle"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Product Title
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="productTitle"
                            id="productTitle"
                            autoComplete="given-name"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="sourcing"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Sourcing
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="sourcing"
                            id="sourcing"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="submit" className="submit-button">
                      Add Product
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;