import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NavBar.scss";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://donkey-archive-af41e8314602.herokuapp.com/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      setLoggedIn(false);
      window.location.reload();
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  return (
    <div className="navbar">
      {loggedIn ? (
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button
          className="login"
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default NavBar;
