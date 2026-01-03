import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserContext";
import "./LoginView.scss";

const LoginView = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post(
        "https://donkey-archive-af41e8314602.herokuapp.com/api/auth/login",
        { Username: username, Password: password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        const { token, Username } = response.data;
        localStorage.setItem("token", token);
        setUser({ username: Username, token });
        setLoggedIn(true);
        setSuccess("Login successful! You are now logged in.");
        setError("");
        navigate("/main-view");
      } else {
        setError("Login failed. Please check your credentials and try again.");
        setSuccess("");
      }
    } catch (err) {
      console.error("Login Error:", err);

      // Extract user-friendly error message
      let errorMessage = "Error logging in. Please try again later.";
      if (err.response) {
        const status = err.response.status;
        const serverMessage = err.response.data?.message || err.response.data?.error;

        if (status === 401) {
          errorMessage = "Invalid username or password. Please try again.";
        } else if (status === 400) {
          errorMessage = serverMessage || "Invalid request. Please check your input.";
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (serverMessage) {
          errorMessage = serverMessage;
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your internet connection.";
      }

      setError(errorMessage);
      setSuccess("");
    }
  };

  return (
    <div className="login-view">
      <span>THE DONKEY ARCHIVE LOG IN</span>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formLoginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formLoginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Button variant="primary" type="submit">
                LOGIN
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginView;
