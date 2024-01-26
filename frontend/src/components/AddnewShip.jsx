import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";
import Swal from "sweetalert2";
import Select from "react-select";
import makeAnimated from "react-select/animated";


const animatedComponents = makeAnimated();

const AddnewShip = () => {
  const userData = JSON.parse(localStorage.getItem("loginToken"));
  const isAdminLoggedIn = userData.userInfo.role;
  const [productName, setProductName] = useState("");
  const [formData, setFormData] = useState({
    parcel: "In Transit",
    receiverName: "",
    productName: "",
    client: isAdminLoggedIn === "Admin" ? "" : userData.userInfo._id,
    clientName: userData.userInfo.username,
    city: "United States",
    orderNumber: "",
    customerEmail: "",
    orderID: "",
    customerAddress: "",
    contactNumber: "",
    codAmount: "",
  });
  const [employeeName, setEmployeeName] = useState([]);
  const [getProductList, setProductList] = useState([]);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let userDataLocal = localStorage.getItem("loginToken");
      let userDataLocalParsed = JSON.parse(userDataLocal);
      let userId = userDataLocalParsed.userInfo._id;

      const response = await axios.post("http://localhost:3001/addshipment", {
        ...formData,
        userIds: [userId],
        orderID: `${formData.orderNumber}${formData.slugName}`,
        productName: productName, // Include productName in the request
      });
      console.log("Form data submitted:", response.data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: `Shipment has been added ${formData.receiverName}`,
        }).then(() => {
          // Reset the form after clicking OK on Swal
          formRef.current.reset();
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
      return;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "client") {
      const [selectedId, selectedUsername] = value.split("-");
      const slugIsHere =
        FilteredAdmin.find((employee) => employee.id === selectedId)?.slug ||
        "";

      setFormData((prevFormData) => ({
        ...prevFormData,
        client: selectedId,
        clientName: selectedUsername,
        slugName: slugIsHere,
      }));
    } else if (name === "orderNumber") {
      const slugName = formData.slugName || "";
      const orderIDConcat = `${formData.orderNumber}${slugName}`;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        orderID: orderIDConcat,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/getregister")
      .then((employeeNameResponse) => {
        setEmployeeName(employeeNameResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching shipment data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getproducts")
      .then((ProductData) => {
        setProductList(ProductData.data);
      })
      .catch((error) => {
        console.error("Error fetching shipment data:", error);
      });
  }, []);

  const FilteredAdmin = employeeName.filter((item) => item.role === "Client");
  // const filteredEmployees = employeeName.filter((item) => item.client === formData.client);
  // console.log(getSlug)
  return (
    <>
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-lg-2">
            <Navbar />
          </div>
          <div className="col-lg-10 p-5 ">
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                borderRadius: "10px",
                padding: "45px",
                backgroundColor:"white"
              }}
            >
            <form ref={formRef} onSubmit={handleSubmit}>
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
                            <select
                              id="client"
                              name="client"
                              className="form-input"
                              onChange={handleChange}
                              value={`${formData.client}-${formData.clientName}`}
                            >
                              <option>Select a client</option>
                              {FilteredAdmin.map((employee) => (
                                <option
                                  key={employee.id}
                                  value={`${employee.id}-${employee.username}`}
                                >
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

                    <div className="sm:col-span-3 mt-4">
                      <label
                        htmlFor="orderNumber"
                        className="block text-sm font-medium mb-2 leading-6 text-gray-900"
                      >
                        #Order Number
                      </label>
                      <div class="relative mb-6">
                        <div class="relative mb-6">
                          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            {FilteredAdmin.map((employee) => {
                              const res = employee.id === formData.client;
                              const slugIsHere = res ? employee.slug : null;
                              // setSlug(slugIsHere)
                              return (
                                <>
                                  <div key={employee.slug}>{slugIsHere}</div>
                                  <input
                                    id="slugName"
                                    name="slugName"
                                    defaultValue={slugIsHere}
                                    className="form-control"
                                    onChange={handleChange}
                                    style={{ display: "none" }}
                                  />
                                </>
                              );
                            })}
                          </div>
                          <input  
                            type="number"
                            name="orderNumber"
                            id="orderNumber"
                            autoComplete="given-name"
                            onChange={handleChange}
                            value={formData.orderNumber}
                            className="border-1 outline-none border-stone-300	 focus:border-red-500 text-dark-900 text-sm rounded-lg focus:ring-1 focus:ring-red-500 block w-full ps-10 p-2.5 light:bg-white-700 light:placeholder-gray-400 text-gray-950"
                            placeholder="#01234"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="product"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product
                      </label>
                      <div className="mt-2">
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          name="product"
                          id="product"
                          className="focus:border-red-400"
                          options={getProductList.map((e) => ({
                            value: e.productTitle,
                            label: e.productTitle,
                          }))}
                          onChange={(selectedOptions) => {
                            const selectedProducts = selectedOptions.map((option) => option.value);
                            setProductName(selectedProducts);
                            // Further processing or setting state with the array of objects
                            console.log(selectedProducts);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                          htmlFor="city"
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
                            <option value="United State">United State</option>
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
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Date Of Order
                        </label>
                        <div className="mt-2">
                          <input
                            id="date"
                            name="date"
                            type="date"
                            autoComplete="date"
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