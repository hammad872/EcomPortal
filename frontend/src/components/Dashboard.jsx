import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const columnsTab1 = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const columnsTab2 = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Dashboard = () => {
  const [divVisible, setDivVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1"); // Move the state here

  const handleAccountCard = () => {
    // Toggle the visibility state
    setDivVisible(!divVisible);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <header className="dashboard-header">
          <div className="d-flex justify-content-end pt-2 px-3">
            <div className="text-right user_div mx-2">
              <div className="user_profile_icon" onClick={handleAccountCard}>
                <svg className="svg-icon user_icon" viewBox="0 0 20 20">
                  <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                </svg>
              </div>
              {divVisible && (
                <div className="card" id="profile_card">
                  <div className="card__title">Cameron Williamson</div>
                  <div className="card__subtitle">Web Development</div>
                  <div className="card__wrapper">
                    <button className="card__btn mx-1" onClick={handleLogout}>
                      Logout
                    </button>
                    <button className="card__btn mx-1 ">Button</button>
                  </div>
                </div>
              )}
            </div>
            <div className="text-right bell-noti mx2">
              <button className="button">
                <svg viewBox="0 0 448 512" className="bell">
                  <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div className="row">
          <div className="col-lg-2">
            <Navbar />
          </div>
          <div className="col-lg-10">
            <div className="row justify-content-center column-gap-sm-3">
              <div className="col-lg-3  ">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\box.png" alt="" />
                  <h2>200</h2>
                  <p>Total Parcels</p>
                </div>
              </div>
              <div className="col-lg-3  ">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\delivery-truck.png" alt="" />
                  <h2>200</h2>
                  <p>Delivered</p>
                </div>
              </div>
              <div className="col-lg-3  ">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\reload.png" alt="" />
                  <h2>200</h2>
                  <p>In Transit</p>
                </div>
              </div>
              <div className="col-lg-3  ">
                <div className="ship_stat p-3 mx-1">
                  <img src="\assets\restart.png" alt="" />
                  <h2>200</h2>
                  <p>Returned</p>
                </div>
              </div>
            </div>
            <div className="container">
              {/* ... (Your existing code) ... */}

              <div>
                <button onClick={() => setActiveTab("tab1")}>Tab 1</button>
                <button onClick={() => setActiveTab("tab2")}>Tab 2</button>

                {activeTab === "tab1" && (
                  <div id="tab1" style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columnsTab1}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                    />
                  </div>
                )}

                {activeTab === "tab2" && (
                  <div id="tab2" style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columnsTab2}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
