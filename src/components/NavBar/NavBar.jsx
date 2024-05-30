import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NavBar.scss";
import { Link } from "react-router-dom";

const NavBar = ({ loggedIn, handleLogout }) => {
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://donkey-archive-af41e8314602.herokuapp.com/api/auth/login"
      );
      localStorage.setItem("token", response.data.token);
      window.location.reload();
    } catch (err) {
      console.error("Error logging in", err);
    }
  };

  return (
    <div className="navbar">
      {loggedIn ? (
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <button className="login" onClick={handleLogin}>
            Login
          </button>
          <Link to="/register" className="register-link">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
