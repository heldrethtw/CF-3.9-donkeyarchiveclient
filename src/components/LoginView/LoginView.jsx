import React, { useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import "./LoginView.scss";

const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://donkey-archive-af41e8314602.herokuapp.com/api/auth/login"
      );
      localStorage.setItem("token", response.data.token);
      window.location.reload();
    } catch (err) {
      setError("Error logging in");
    }
  };

  return (
    <div className="login-view">
      <NavBar />
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
};

export default LoginView;
