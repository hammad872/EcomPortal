import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";
import Swal from "sweetalert2";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";

// const animatedComponents = makeAnimated();



const AddnewShip = () => {
  const userData = JSON.parse(localStorage.getItem("loginToken"));
  const isAdminLoggedIn = userData.userInfo.role;
  const [formData, setFormData] = useState({
    parcel: "",
    reference: "",
    receiverName: "",
    product: "" , // Updated to include the client field
    client: isAdminLoggedIn === "Admin" ? "" : userData.userInfo._id, // Updated to include the client field
    clientName:  userData.userInfo.username, // Updated to include the client field
    city: "United States", // Set a default value
    customerEmail: "",
    customerAddress: "",
    contactNumber: "",
    codAmount: "",
    // codAmount: "",
  });

  const [employeeName, setEmployeeName] = useState([]);
  // const [getProductList, setProductList] = useState([]);

  // console.log(getProductList)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let userDataLocal = localStorage.getItem("loginToken");
      let userDataLocalParsed = JSON.parse(userDataLocal);
      let userId = userDataLocalParsed.userInfo._id;

      console.log("User ID:", userId);
      console.log("Form Data:", formData);

      const response = await axios.post("http://localhost:3001/addshipment", {
        ...formData,
        userIds: [userId],
        // Updated to use userId directly
      });

      console.log("Form data submitted:", response.data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: `Shipment has been added ${formData.reference}`,
        });
      } else {
        console.error("Error submitting form data:", response.data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while adding the shipment.",
        });
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      Swal.fire({
        icon: "warning",
        title: "Please Fill all the Fields",
        text: "An error occurred while adding the shipment.",
      });
      return
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      reference: "",
      receiverName: "",
      customerEmail: "",
      customerAddress: "",
      contactNumber: "",
      codAmount: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/getregister")
      .then((employeeNameResponse) => {
        setEmployeeName(employeeNameResponse.data); // Update this line
      })
      .catch((error) => {
        console.error("Error fetching shipment data:", error);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/getproducts")
  //     .then((ProductData) => {
  //       setProductList(ProductData.data); // Update this line
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching shipment data:", error);
  //     });
  // }, []);

  // const isAdminPresent = employeeName.filter(
  //   (employee) => employee.role === "Admin"
  // );
  // console.log(isAdminPresent);
  // console.log("ok");
  const FilteredAdmin = employeeName.filter((item) => item.role === "Client");
  // console.log(FilteredAdmin)
  // console.log(employeeName)

  console.log(FilteredAdmin)

  //   const Hassan = FilteredAdmin.filter( (item) => {
  //   const hanBharwe = item.id
  //   console.log(hanBharwe)
  //   // console.log("hanBharwe")
  //  }) 
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
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <h3>Shipment Entry</h3>
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="client"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Client
                      </label>
                      <div className="mt-2">

                        {isAdminLoggedIn === "Admin" ? (
                          <>
                           <input
                              id="clientName"
                              name="clientName"
                              defaultValue={userData.userInfo.username}
                              className="form-control"
                              onChange={handleChange}
                              style={{ display: "none" }}
                            />
                          <select
                            id="client"
                            name="client"
                            className="form-input"
                            onChange={handleChange}
                            value={formData.client}
                          >
                            <option>Select a client</option>
                            {FilteredAdmin.map((employee) => (
                              <option key={employee.id} value={employee.id}>
                                {employee.username}
                              </option>
                            ))}
                          </select>
                          </>

                        ) : (
                          <>
                            <input
                              id="client"
                              name="client"
                              defaultValue={userData.userInfo._id}
                              className="form-control"
                              onChange={handleChange}
                              style={{ display: "none" }}
                            />

                            <input
                              id="clientName"
                              name="clientName"
                              defaultValue={userData.userInfo.username}
                              className="form-control"
                              onChange={handleChange}
                              style={{ display: "none" }}
                            />
                          </>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="parcel"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Parcel
                      </label>
                      <div className="mt-2">
                        <select
                          id="parcel"
                          name="parcel"
                          autoComplete="country-name"
                          className="form-input"
                          onChange={handleChange}
                        >
                          <option>Parcel Status</option>
                          <option value="Delivered">Delivered</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Returned">Returned</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    {/* <div className="sm:col-span-3">
                      <label
                        htmlFor="parcel"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product
                      </label>
                      <div className="mt-2">
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          options={getProductList.map( (e) => {
                            return {value : e.productTitle, label : e.productTitle}
                          })}
                        />
                      </div>
                    </div> */}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="reference"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Reference
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="reference"
                            id="reference"
                            autoComplete="given-name"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="receiverName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Receiver Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="receiverName"
                            id="receiverName"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <select
                            id="city"
                            name="city"
                            autoComplete="country-name"
                            className="form-input"
                            onChange={handleChange}
                          >
                            <option value="Delivered">United State</option>
                            <option value="Canada">Canada</option>
                            <option value="Mexico">Mexico</option>
                          </select>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="customerEmail"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Customer Email
                        </label>
                        <div className="mt-2">
                          <input
                            id="customerEmail"
                            name="customerEmail"
                            type="email"
                            autoComplete="email"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="customerAddress"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Customer Address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="customerAddress"
                            id="customerAddress"
                            autoComplete="customer-address"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="contactNumber"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Contact Number
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="contactNumber"
                            id="contactNumber"
                            autoComplete="address-level2"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="codAmount"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          COD Amount
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="codAmount"
                            id="codAmount"
                            autoComplete="cod-amount"
                            className="form-input"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button type="submit" className="submit-button">
                    Add Shipment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddnewShip;