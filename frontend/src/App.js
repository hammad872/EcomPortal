import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import NavPanel from './components/NavPanel';
import Dashboard from './components/Dashboard';

function App() {
  // State to track user login status
  const [isLoggedIn, setLoggedIn] = useState(true);

  // Function to update login status
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>

      {/* Conditionally render Dashboard if logged in */}
      {isLoggedIn && <Dashboard />}
    </>
  );
}

export default App;
