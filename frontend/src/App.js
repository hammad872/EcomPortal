import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import Dashboard from "./components/Dashboard";

function App() {
  // State to track user login status
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Function to update login status
  const handleLogin = () => {
    // Perform authentication logic here
    // For example, check credentials and setLoggedIn accordingly
    setLoggedIn(true);
  };

  


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      {/* Conditionally render Dashboard if logged in */}
      {isLoggedIn && <Dashboard />}
    </BrowserRouter>
  );
}

export default App;
