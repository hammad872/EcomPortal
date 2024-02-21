import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";

const FileDownloadComponent = () => {
  const [folderContents, setFolderContents] = useState([]);
  const userData = JSON.parse(localStorage.getItem("loginToken"));
  const folderPath = userData.userInfo.username;

  useEffect(() => {
    const fetchFolderContents = async () => {
      try {
        const apiUrl = `https://ecomapi-owct.onrender.com/cloudinary/${folderPath}`;
        const response = await axios.get(apiUrl);
        setFolderContents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching folder contents:", error);
      }
    };

    fetchFolderContents();
  }, [folderPath]);

  const handleFileDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const columns = [
    { field: "id", headerName: "S/N", width: 150 },
    { field: "invoice", headerName: "Invoice Of", width: 225},
    { field: "date", headerName: "Date", width: 225 },
    {
      field: "action",
      headerName: "Download",
      width: 250,
      renderCell: (params) => (
        <button
          className="Btn2"
          onClick={() => handleFileDownload(params.row.secure_url)}
        >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 384 512"
    class="svgIcon"
  >
    <path
      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
    ></path>
  </svg>
  <span class="icon2"></span>
        </button>
      ),
    },
  ];

  const rows = folderContents.map((file, index) => ({
    id: index + 1,
    date: file.folder.split("/")[1],
    invoice: "Invoice Of",
    secure_url: file.secure_url,
  }));

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-lg-2">
          <Navbar />
        </div>
        <div className="col-lg-10 p-5">
          <div className="auth-div mt-5">
        <h3 className="invoice-heading mb-5">
          Download Invoice
        </h3>
          <div style={{ height: 400 , width: "75%" }}>
            <DataGrid rows={rows} columns={columns} pageSize={5}  />
          </div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDownloadComponent;
