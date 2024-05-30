import React, { useState } from "react";
import axios from "axios";
import "./RegistrationView.scss";

const RegistrationView = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://donkey-archive-af41e8314602.herokuapp.com/api/auth/register",
        { username, password, email, birth }
      );
      localStorage.setItem("token", response.data.token);
      setLoggedIn(true);
      setSuccess("Registration successful! You are now logged in.");
    } catch (err) {
      setError("Username or email already exists");
    }
  };

  return (
    <div className="registration-view">
      <form className="registration-form" onSubmit={handleRegister}>
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
        <input
          type="Birth"
          placeholder="Birth"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <span className="error">{error}</span>}
        {success && <span className="success">{success}</span>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationView;
