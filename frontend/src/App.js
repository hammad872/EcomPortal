// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
import AddnewShip from "./components/AddnewShip";
import ImportShip from "./components/ImportShip";
import AddProduct from "./components/AddProduct";
import ProductTable from "./components/ProductTable";
import FindShip from "./components/FindShip";
import FindMultiShip from "./components/FindMultiShip";
import ChangeStatus from "./components/ChangeStatus";

function App() {
  useEffect(() => {
    // Check if the user is already logged in
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setLoggedIn(true);
    }
  }, []);

  // PrivateRoute component to handle private routes
  const [isLoggedIn, setLoggedIn] = useState(false);
  const PrivateRoute = ({ element }) => {
    const isLoggedIn = localStorage.getItem("loginToken");

    return isLoggedIn ? element : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<SignupForm />} />
        {/* Private routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/add-new"
          element={<PrivateRoute element={<AddnewShip />} />}
        />
        <Route
          path="/import"
          element={<PrivateRoute element={<ImportShip />} />}
        />
        <Route
          path="/add-product"
          element={<PrivateRoute element={<AddProduct />} />}
        />
        <Route
          path="/product-table"
          element={<PrivateRoute element={<ProductTable />} />}
        />
        <Route
          path="/find-shipment"
          element={<PrivateRoute element={<FindShip />} />}
        />
        <Route
          path="/find-multi-shipment"
          element={<PrivateRoute element={<FindMultiShip />} />}
        />
        <Route
          path="/change-status"
          element={<PrivateRoute element={<ChangeStatus />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
