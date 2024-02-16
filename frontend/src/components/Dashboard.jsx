import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Table from "./Table";
import Header from "./Header";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Dashboard = () => {
  const [totalParcels, setTotalParcels] = useState([]);
  const [deliveredParcels, setDeliveredParcels] = useState([]);
  const [inTransitParcels, setInTransitParcels] = useState([]);
  const [returnedParcels, setReturnedParcels] = useState([]);
  const [cancelledParcels, setCancelledParcels] = useState([]);
  const [totalCODAmount, setTotalCODAmount] = useState(0);
  const [loading, setLoading] = useState(true); // State to track loading


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getshipments");
      const response2 = await axios.get("http://localhost:3001/totalcodamount");
      const data = response.data;
      const dataForCOD = response2.data;
      const userData = JSON.parse(localStorage.getItem("loginToken"));
      const userIDForData = userData.userInfo._id;
      const isAdmin = userData.userInfo.role;
      setTotalCODAmount(dataForCOD.totalCODAmount)
     
      // Update state variables with filtered data
      setTotalParcels(
        isAdmin === "Client"
          ? data.filter((item) => item.client === userIDForData)
          : data
      );
      setDeliveredParcels(
        isAdmin === "Client"
          ? data.filter(
              (item) =>
                item.parcel === "Delivered" && item.client === userIDForData
            )
          : data.filter((item) => item.parcel === "Delivered")
      );
      setInTransitParcels(
        isAdmin === "Client"
          ? data.filter(
              (item) =>
                item.parcel === "In Transit" && item.client === userIDForData
            )
          : data.filter((item) => item.parcel === "In Transit")
      );
      setReturnedParcels(
        isAdmin === "Client"
          ? data.filter(
              (item) =>
                item.parcel === "Returned" && item.client === userIDForData
            )
          : data.filter((item) => item.parcel === "Returned")
      );
      setCancelledParcels(
        isAdmin === "Client"
          ? data.filter(
              (item) =>
                item.parcel === "Cancelled" && item.client === userIDForData
            )
          : data.filter((item) => item.parcel === "Cancelled")
      );
      // Calculate the total COD amount from shipment data
      // const myCOD = data.reduce(
      //   (total, parcel) => total + (parcel.codAmount || 0),
      //   0
      // );
      // console.log(myCOD)
      // const myCODUser = data.filter((item) => item.client === userIDForData);
      // const myCODUserFinal = myCODUser.reduce(
      //   (total, parcel) => total + (parcel.codAmount || 0),
      //   0
      // );
      // isAdmin === "Client"
      //   ? setTotalCODAmount(myCODUserFinal)
      //   : setTotalCODAmount(myCOD);
    } catch (error) {
      console.error("Error fetching shipment data:", error);
    }
  };

  // Fetch data initially
  fetchData();

  // Set up interval to fetch data every second
  const intervalId = setInterval(fetchData, 1000);

  // Cleanup function
  return () => clearInterval(intervalId);
}, []);
  useEffect(() => {
    // Simulate loading time
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout value as needed

    // Cleanup function
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <Header />
        <div className="row">
          <div className="col-lg-2">
            <Navbar />
          </div>
          <div className="col-lg-10">
            {/* Total Sales Card */}
            <div className="row mb-4 ml-3">
              <div className="kpi-card red2">
                <span className="card-value">
                  { new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "AED",
                  }).format(totalCODAmount) }
                </span>
                <span className="card-text2">Total Sales</span>
                <i className="fa fa-shopping-cart icon2" aria-hidden="true"></i>
              </div>
            </div>

            {/* Parcel Statistics Cards */}
            {loading ? (
               <div className="row justify-content-center align-items-center column-gap-sm-3">
               <div className="col-lg-2-5">
                 <div className="ship_stat p-3 mx-1">
                   <Skeleton
                     variant="rectangle"
                     width={"60%"}
                     height={80}
                     sx={{
                       fontSize: "1rem",
                       margin: "0 auto",
                       bgcolor: "grey.300",
                     }}
                   />
                   <h2>
                     <Skeleton
                       variant="text"
                       width={"60%"}
                       height={20}
                       sx={{
                         fontSize: "1rem",
                         margin: "0 auto",
                         bgcolor: "grey.300",
                       }}
                     />
                   </h2>
                   <p>
                     <Skeleton
                       variant="text"
                       width={"60%"}
                       height={20}
                       sx={{
                         fontSize: "1rem",
                         margin: "0 auto",
                         bgcolor: "grey.300",
                       }}
                     />
                   </p>
                 </div>
               </div>
               <div className="col-lg-2-5">
                 <div className="ship_stat p-3 mx-1">
                   <Skeleton
                     variant="rectangle"
                     width={"60%"}
                     height={80}
                     sx={{
                       fontSize: "1rem",
                       margin: "0 auto",
                       bgcolor: "grey.300",
                     }}
                   />
                   <h2>
                     <Skeleton
                       variant="text"
                       width={"60%"}
                       height={20}
                       sx={{
                         fontSize: "1rem",
                         margin: "0 auto",
                         bgcolor: "grey.300",
                       }}
                     />
                   </h2>
                   <p>
                     <Skeleton
                       variant="text"
                       width={"60%"}
                       height={20}
                       sx={{
                         fontSize: "1rem",
                         margin: "0 auto",
                         bgcolor: "grey.300",
                       }}
                     />
                   </p>
                 </div>
               </div>
               <div className="col-lg-2-5">
                 <div className="ship_stat p-3 mx-1">
                   <Skeleton
                     variant="rectangle"
                     width={"60%"}
                     height={80}
                     sx={{
                       fontSize: "1rem",
                       margin: "0 auto",
                       bgcolor: "grey.300",
                     }}
                   />
                   <h2>
                     <Skeleton
                       variant="text"
                       width={"60%"}
                       height={20}
                       sx={{
                         fontSize: "1rem",
                         margin: "0 auto",
                         bgcolor: "grey.300",
                       }}
                     />
                   </h2>
                   <p>
                     <Skeleton
                       variant="text"
                       width={"60%"}
                       height={20}
                       sx={{
                         fontSize: "1rem",
                         margin: "0 auto",
                         bgcolor: "grey.300",
                       }}
                     />
                   </p>
                 </div>
               </div>
               <div className="col-lg-2-5">
                 <div className="ship_stat p-3 mx-1">
                   <Skeleton
                     variant="rectangle"
                     width={"60%"}
                     height={80}
                     sx={{
                       fontSize: "1rem",
                       margin: "0 auto",
                       bgcolor: "grey.300",
                     }}
                   />
                   <h2>
                     <Skeleton
                       variant="text"
                       width={"60%"}
                       height={20}
                       sx={{
                         fontSize: "1rem",
                         margin: "0 auto",
                         bgcolor: "grey.300",
                       }}
                     />
                   </h2>
                   <p>
                     <Skeleton
                       variant="text"
                       width={"60%"}
                       height={20}
                       sx={{
                         fontSize: "1rem",
                         margin: "0 auto",
                         bgcolor: "grey.300",
                       }}
                     />
                   </p>
                 </div>
               </div>
               <div className="col-lg-2-5">
                 <div className="ship_stat p-3 mx-1">
                   <Skeleton
                     variant="rectangle"
                     width={"60%"}
                     height={80}
                     sx={{
                       fontSize: "1rem",
                       margin: "0 auto",
                       bgcolor: "grey.300",
                     }}
                   />
                   <h2>
                     <Skeleton
                       variant="text"
                       width={"60%"}
                       height={20}
                       sx={{
                         fontSize: "1rem",
                         margin: "0 auto",
                         bgcolor: "grey.300",
                       }}
                     />
                   </h2>
                   <p>
                     <Skeleton
                       variant="text"
                       width={"60%"}
                       height={20}
                       sx={{
                         fontSize: "1rem",
                         margin: "0 auto",
                         bgcolor: "grey.300",
                       }}
                     />
                   </p>
                 </div>
               </div>
             </div>
            ) : (
              <div className="row justify-content-center align-items-center column-gap-sm-3">
                <div className="col-lg-2-5">
                  <div className="ship_stat p-3 mx-1">
                    <img src="\assets\box.png" alt="" />
                    <h2>{totalParcels.length}</h2>
                    <p>Total Parcels</p>
                  </div>
                </div>
                <div className="col-lg-2-5">
                  <div className="ship_stat p-3 mx-1">
                    <img src="\assets\delivery-truck.png" alt="" />
                    <h2>{deliveredParcels.length}</h2>
                    <p>Delivered</p>
                  </div>
                </div>
                <div className="col-lg-2-5">
                  <div className="ship_stat p-3 mx-1">
                    <img src="\assets\reload.png" alt="" />
                    <h2>{inTransitParcels.length}</h2>
                    <p>In Transit</p>
                  </div>
                </div>
                <div className="col-lg-2-5">
                  <div className="ship_stat p-3 mx-1">
                    <img src="\assets\restart.png" alt="" />
                    <h2>{returnedParcels.length}</h2>
                    <p>Returned</p>
                  </div>
                </div>
                <div className="col-lg-2-5">
                  <div className="ship_stat p-3 mx-1">
                    <img src="\assets\prohibition.png" alt="" />
                    <h2>{cancelledParcels.length}</h2>
                    <p>Cancelled</p>
                  </div>
                </div>
              </div>
            )}

            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;