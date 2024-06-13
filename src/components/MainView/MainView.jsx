import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import LoginView from "../LoginView/LoginView";
import RegistrationView from "../RegistrationView/RegistrationView";
import ProfileView from "../ProfileView/ProfileView";

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
      <NavBar loggedIn={loggedIn} handleLogout={handleLogout} />
      <Routes>
        {!loggedIn ? (
          <>
            <Route
              path="/login"
              element={<LoginView setLoggedIn={setLoggedIn} />}
            />
            <Route
              path="/register"
              element={<RegistrationView setLoggedIn={setLoggedIn} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="*" element={<Navigate to="/profile" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default MainView;
