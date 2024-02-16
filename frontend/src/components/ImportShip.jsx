import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Navbar from "./Navbar";
import Header from "./Header";

const MySwal = withReactContent(Swal);

const ImportShip = () => {
  const [clientOptions, setClientOptions] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleClientSelection = (value) => {
    const [clientId, clientName] = value.split("-");
    setSelectedClient({ clientId, clientName });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
        setFileUploaded(true); // Set the flag to true when the file is uploaded
      },
    });
  };

  const resetForm = () => {
    setSelectedClient(null);
    setCsvData([]);
    setFileUploaded(false);
  };
  // const handleClientSelection = (e) =>{
  //   const { name, value } = e.target;
  // }
  const sendDataToMongoDB = () => {
    // Modify the API endpoint accordingly
    axios
      .post("https://ecomapi-owct.onrender.com/upload-csv", {
        data: csvData,
        client: selectedClient.clientId,
        clientName: selectedClient.clientName,
      })
      .then((response) => {
        console.log(response.data);
        MySwal.fire({
          icon: "success",
          title: "CSV Submitted Successfully!",
          text: "Data has been successfully submitted.",
        }).then(() => {
          resetForm(); // Reset the form after clicking "OK"
        });
      })
      .catch((error) => {
        console.error("Error sending data to MongoDB:", error);
        MySwal.fire({
          icon: "error",
          title: "Error Submitting CSV",
          text: "An error occurred while submitting the CSV.",
        });
      });
  };

  // Fetch client options on component mount
  // Modify the API endpoint accordingly
  useEffect(() => {
    axios
      .get("https://ecomapi-owct.onrender.com/getregister")
      .then((response) => {
        const clientOptions = response.data
          .filter((item) => item.role === "Client")
          .map((client) => ({
            value: `${client.id}-${client.username}`,
            label: client.username,
          }));
        setClientOptions(clientOptions);
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  }, []);

  return (
    <div>
      <Header /> {/* Include your Header component */}
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <Navbar /> {/* Include your Navbar component */}
          </div>
          <div className="col-lg-10 p-5">
            <div
              style={{
                padding: "20px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
              className="Import"
            >
              <h3>Import Shipment</h3>
              <div className="mt-2">
                <label htmlFor="client">Select a client:</label>
                <select
                  id="client"
                  name="client"
                  className="form-input"
                  onChange={(e) => handleClientSelection(e.target.value)}
                >
                  <option value="">Select a client</option>
                  {clientOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 file">
                <label for="file" class="custum-file-upload">
                  <div class="icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill=""
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                          fill=""
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div class="text">
                    <span>Click to upload image</span>
                  </div>
                  <input
                    type="file"
                    id="file"
                    accept=".csv"
                    onChange={(e) => handleFileUpload(e)}
                  />
                </label>

                {fileUploaded && (
                  
                  <span style={{ marginLeft: "10px", color: "green" }}>
                    ✓ File Uploaded
                  </span>
                )}
              </div>
              {csvData.length > 0 && selectedClient && (
                <div className="mt-2">
                  {/* Display data here based on selectedClient */}
                  <ul>
                    {csvData.map((row, index) => (
                      <li key={index}>{row.name}</li>
                    ))}
                  </ul>
                  <button
                    type="submit"
                    className="submit-button"
                    onClick={sendDataToMongoDB}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportShip;
