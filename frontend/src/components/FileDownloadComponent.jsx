import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";
import Skeleton from "@mui/material/Skeleton";

const FileDownloadComponent = () => {
  const [folderContents, setFolderContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem("loginToken"));
  const folderPath = userData.userInfo.username;

  useEffect(() => {
    const fetchFolderContents = async () => {
      try {
        const apiUrl = `https://my-node-app-nsih.onrender.com/cloudinary/${folderPath}`;
        const response = await axios.get(apiUrl);
        setFolderContents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching folder contents:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchFolderContents();
  }, [folderPath]);

  const handleFileDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const columns = [
    { field: "id", headerName: "S/N", width: 150 },
    { field: "invoice", headerName: "Invoice Of", width: 225 },
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
            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
          </svg>
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
        
        <div className="col-lg-12 p-5">
          <div className="auth-div mt-5">
            <h3 className="invoice-heading mb-5">Download Invoice</h3>
            <div style={{ height: 400, width: "75%" }}>
            {loading ? (
                (
                  <table
                    style={{
                      width: "100%",
                      border: "2.5px solid #ccc",
                    }}
                  >
                    <tr className="px-3">
                      &nbsp;
                      <div className="row">
                        <div className="col-lg-3 px-5">
                          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                          <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
                        </div>
                        <div className="col-lg-3 px-5">
                          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                          <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
                        </div>
                        <div className="col-lg-3 px-5">
                          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                          <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
                        </div>
                        <div className="col-lg-3 px-5">
                          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                          <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
                        </div>

                      </div>
                      &nbsp;
                    </tr>
                    <tr className="px-3">
                    
                      <div className="row">
                        <div className="col-lg-12 px-5">
                          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                          <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
                        </div>
                      </div>
                    </tr>
                    
                    <tr className="px-3">
                      <div className="row">
                        <div className="col-lg-12 px-5">
                          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                          <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
                        </div>
                      </div>
                    </tr>
                    <tr className="px-3">
                      <div className="row">
                        <div className="col-lg-12 px-5">
                          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                          <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
                        </div>
                      </div>
                    </tr>
                    <tr className="px-3">
                      <div className="row">
                        <div className="col-lg-12 px-5">
                          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                          <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
                        </div>
                      </div>
                    </tr>
                    <tr className="px-3">
                      <div className="row">
                        <div className="col-lg-12 px-5">
                          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                          <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
                        </div>
                      </div>
                    </tr>
                    <tr className="px-3">
                      <div className="row">
                        <div className="col-lg-12 px-5">
                          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                          <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
                        </div>
                      </div>
                      &nbsp;
                    </tr>
                  </table>
                )
              ) :  (
              <DataGrid rows={rows} columns={columns} pageSize={5} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDownloadComponent;
