// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
import AddnewShip from "./components/AddnewShip";
import ImportShip from "./components/ImportShip";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setLoggedIn(true);  
    }
  }, []);

  // PrivateRoute component to handle private routes
  const PrivateRoute = ({ element, path }) => {
    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/" state={{ from: path }} replace />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginForm setLoggedIn={setLoggedIn} />}
        />
        <Route path="/signup" element={<SignupForm />} />
        {/* Private routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} path="/dashboard" />}
        />
        <Route
          path="/add-new"
          element={<PrivateRoute element={<AddnewShip />} path="/add-new" />}
        />
        <Route
          path="/import"
          element={<PrivateRoute element={<ImportShip />} path="/import" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
