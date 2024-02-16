import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";

const FileDownloadComponent = () => {
  let userData = JSON.parse(localStorage.getItem("loginToken"));
  let currentUser = userData.userInfo._id;
  const [link, setLink] = useState(""); // Correct usage of useState

  useEffect(() => {
    // Set the link when the component mounts
    setLink(`https://ecomapi-owct.onrender.com/download/${currentUser}-invoice.xls`);
  }, [currentUser]); // Make sure to include currentUser in the dependency array

  return (
    <>
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-lg-2">
            <Navbar />
          </div>
          <div className="col-lg-10 p-5">
            <div>
              {/* Render the download link */}
              <a className="btn btn-primary" href={link}>
                Download Invoice
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileDownloadComponent;
