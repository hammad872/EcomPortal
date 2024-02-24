import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Navbar from "./Navbar";
import Header from "./Header";
import Alert from "@mui/material/Alert";




const MySwal = withReactContent(Swal);

const UploadInvoiceCloud = () => {

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectClient, setSelectClient] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [uploadResult, setUploadResult] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("https://ecomapi-owct.onrender.com/getregister");
        const FilteredAdmin = response.data.filter(
          (item) => item.role === "Client"
        );
        // yahan se sb hojaega
        setClients(FilteredAdmin);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
  
    fetchClients();
  }, []);

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
    setSelectClient(false)
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileUploaded(true);
  };


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedClient) {
      setSelectClient(true)
      return;
    }
    if (!file) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Upload Invoice First',
      });
      return;
    }
    if (!selectedDate) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please provide a folder name and select a date',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'yo0fksdr'); // Include the upload preset
    formData.append('public_id', `${selectedClient}/${selectedDate}/${file.name}`); // Include the folder name and selected date in the public_id

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dus0ln30w/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setUploadResult(data);
      setFileUploaded(true);
      MySwal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'File uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error uploading file',
      });
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-lg-12 p-5">
          <div
            style={{
              padding: "20px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
            }}
          >
            <label htmlFor="client">Select Client:</label> <br />
            {selectClient && <Alert className="mt-3 mb-3" severity="warning">Please select a client</Alert>}
            <select
              className="form-input"
              id="client"
              value={selectedClient}
              onChange={handleClientChange}
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.username}>
                  {client.username}
                </option>
              ))}
            </select>
            <br />
            <br />
            <label
              htmlFor="file"
              className="custum-file-upload"
              style={{ margin: "0 auto" }}
            >
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    fill=""
                  ></path>
                </svg>
              </div>
              <div className="text">
                <span>Click to Add Invoice</span>
              </div>
              <input type="file" id="file" onChange={handleFileChange} />
            </label>
            <div>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <br />
            <button
              style={{ width: "100%" }}
              className="submit-button"
              onClick={handleUpload}
            >
              Upload
            </button>
            {fileUploaded && (
              <span style={{ marginLeft: "10px", color: "green" }}>
                ✓ File Uploaded
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadInvoiceCloud;
