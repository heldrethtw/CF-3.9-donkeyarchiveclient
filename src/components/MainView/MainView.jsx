import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import LoginView from "../LoginView/LoginView";
import RegistrationView from "../RegistrationView/RegistrationView";

const MainView = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
    console.log("Token in localStorage: ", token);
    console.log("Logged in state:", !!token);
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Router>
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={<LoginView setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/register"
          element={<RegistrationView setLoggedIn={setLoggedIn} />}
        />
      </Routes>
      {!loggedIn && <LoginView setLoggedIn={setLoggedIn} />}
    </Router>
  );
};

export default MainView;
