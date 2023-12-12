import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
import AddnewShip from "./components/AddnewShip";
import ImportShip from "./components/ImportShip";

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
        <Route path="/" element={<LoginForm handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginForm handleLogin={handleLogin} />} />
        <Route path="add-new" element={<AddnewShip />}/>
        <Route path="/import" element={<ImportShip />}/>
      </Routes>
      {isLoggedIn && <Dashboard />}
    </BrowserRouter>
  );
}

export default App;
