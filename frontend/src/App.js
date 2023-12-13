import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
import AddnewShip from "./components/AddnewShip";
import ImportShip from "./components/ImportShip";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/add-new" element={<AddnewShip />}/>
        <Route path="/import" element={<ImportShip />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
